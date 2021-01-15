/*
$ - $create link to jQuery
$ - create basic structure
    header
    sidebar
        input
        list of cities searched
    main
        current conditions
        future conditions
when user enters a city and clicks on search
    city is stored into recents array
        array is pulled from local storage
        if city is not found in array it is stored as the latest city
        if the city is found in the array it is not stored
        array is returned to local storage
    city is set to current city
        city is sent to api and data is dipslayed
when user click on a recent city
    city is sent to API and date is displayed
*/

// STRUCTURE LAYOUT
    // header
    $("#mainContainer").append(
        $("<header>")
            .attr("id","header")
            .text("Weather Dashboard")
    );
    $("#mainContainer").append(
        $("<div>")
            .attr("id","secondContainer")
    );


    // aside w/ search bar and list of recent cities
    $("#secondContainer").append(
        $("<aside>")
            .attr("id", "citySelectionPane")
            .append(
                $("<div>")
                    .text("Search for a City:")
            )
    );
    $("#citySelectionPane").append(
        $("<input>")
            .attr ("id", "searchBar")
            .attr ("placeholder", "City Name")


     )
     $("#citySelectionPane").append(
             $("<button>")
                .attr("id", "searchBtn")
                 .text("search")
     )
 
    $("#citySelectionPane").append(
        $("<div>")
            .attr ("id", "recentCitiesPane")
    )
    // main content w/ current conditions and future conditions
    $("#secondContainer").append(
        $("<main>")
            .attr ("id", "conditionsPane")
            .append (
                $("<section>")
                    .attr ("id", "currentConditionsPane")
            )
    );
    $("#conditionsPane").append(
        $("<section>")
            .attr ("id", "futureConditionsPane")
    );

var APIKey = "40a8eac704499a683458b2a328507962";
var searchType = "button"
var queryStatus = "success"

function pullRecentCities() {
    return JSON.parse(localStorage.getItem("weatherRecentCitiesArr"));
}

function pushRecentCities (arr) {
    localStorage.setItem ("weatherRecentCitiesArr", JSON.stringify(arr));
}


function addCityToRecentCitites (userInputCity) {
    if (queryStatus==="success"){
        var recentCitiesArr = pullRecentCities();
        if (recentCitiesArr == null) {
            var recentCitiesArr = [];
        }
        if (recentCitiesArr.includes(userInputCity) == false) {
            if (recentCitiesArr.length < 8) {
                recentCitiesArr.unshift(userInputCity);
            } else {
                recentCitiesArr.pop();
                recentCitiesArr.unshift(userInputCity);
            }
        }
    }
    pushRecentCities (recentCitiesArr);
    appendRecentCities ();
}


function appendRecentCities () {
    $("#recentCitiesPane").empty();
    var recentCitiesArr = pullRecentCities();
    if (recentCitiesArr ===null){
        return;
    }
    for (let index = 0; index < recentCitiesArr.length; index++) {
        const city = $("<button>")
        $(city).val(recentCitiesArr[index]);
        $(city).text(recentCitiesArr[index]);
        $(city).attr("class", "recentBtn");
        $("#recentCitiesPane").append(city);
    }
    $(".recentBtn").on("click", function (event){
        event.preventDefault();
        searchType = "button"
        var recentCity = $(this).val();
        getCityInfo(recentCity);
    });
}

appendRecentCities ();

// on click search - calls getCityInfo() which calls addCityToCurrentCities()
// oneCall ajax call inside first call as it needs variables from the first call
$("#searchBtn").on("click", function (event){
    event.preventDefault();
    queryStatus = "success"
    if ($.trim($("#searchBar").val())) {
    searchType = "searchBar";
    getCityInfo ();
    }
});

function getCityInfo (recentCity) {

    if (searchType === "searchBar"){
        var userInput = $("#searchBar").val().trim();
    } else {
        var userInput = recentCity;
    }

    var addressFutureConditions = `http://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=40a8eac704499a683458b2a328507962`;
    var addressCurrentConditions = `http://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=40a8eac704499a683458b2a328507962`

    $("#searchBar").val("");

    

      $.ajax({
        url: addressCurrentConditions,
        method: "GET",
      }).then(function(currentConditions) {
        console.log(currentConditions);
        UVcall(currentConditions);
        function UVcall (weatherObj) {
            var lat = weatherObj.coord.lat
            var lon = weatherObj.coord.lon
            var addressOneCallWeather = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=40a8eac704499a683458b2a328507962`
            
            $.ajax({
                url: addressOneCallWeather,
                method: "GET"
            }).then(function(oneCallConditions) {
                console.log(oneCallConditions);
                if(queryStatus = "success"){
                    addCityToRecentCitites(userInput);
                    postCurrentConditions(currentConditions, oneCallConditions); 
                } 
            });
        }  
      });

    $.ajax({
        url: addressFutureConditions,
        method: "GET",
        error: function (){queryStatus = "failed"}
      }).then(function(futureConditions) {
        console.log(futureConditions);
        if (queryStatus="success"){
            $("#futureConditionsPane").empty();
            postFutureConditions(futureConditions);
        }
      });
}



function postCurrentConditions (weatherObj, uvObj) {
    $("#currentConditionsPane").empty();
    var currentDate = dayjs ().format('dddd MMM DD');

    var cityName = $("<span>");
    $(cityName).text(weatherObj.name);
    $("#currentConditionsPane").append(cityName);

    var date = $("<span>");
    $(date).text(currentDate);
    $("#currentConditionsPane").append(date);

    var icon = $("<img>");
    $(icon).attr("src", `http://openweathermap.org/img/w/${weatherObj.weather[0].icon}.png`);
    $("#currentConditionsPane").append(icon);

    var tempDiv = $("<div>");
    $(tempDiv).text(`Temp : ${Math.floor((weatherObj.main.temp-273.15)*9/5+32)} F`);
    $("#currentConditionsPane").append(tempDiv);

    var humidity = $("<div>");
    $(humidity).text(`Humidity : ${weatherObj.main.humidity}%`);
    $("#currentConditionsPane").append(humidity);

    var windSpeed = $("<div>");
    $(windSpeed).text("Windspeed : " +weatherObj.wind.speed);
    $("#currentConditionsPane").append(windSpeed);

    var uvIndex = $("<div>");
    $(uvIndex).text("uvIndex : " + uvObj.current.uvi);
    if (uvIndex < 2) {
        $(uvIndex).attr("class", "uvIndexLow");
    } else if (uvIndex < 7) {
        $(uvIndex).attr("class", "uvIndexMed");
    } else {
        $(uvIndex).attr("class", "uvIndexHigh");
    }
    $("#currentConditionsPane").append(uvIndex);
}

function postFutureConditions (weatherObj){
    for (let index = 5; index < 38; index+=8) {
        var date = new dayjs().add(Math.floor(index/8)+1, 'day').format('ddd');

        var cardDiv = $("<div>");
        $(cardDiv).attr("id", `future${index}`);
        $(cardDiv).attr("class","futureCard");
        $("#futureConditionsPane").append(cardDiv);

        var dateDiv = $("<div>");
        $(dateDiv).text(date);
        $(`#future${index}`).append(dateDiv);

        var iconDiv = $("<img>");
        $(iconDiv).attr("src", `http://openweathermap.org/img/w/${weatherObj.list[index].weather[0].icon}.png`);
        $(`#future${index}`).append(iconDiv);

        var tempDiv = $("<div>");
        $(tempDiv).text(`Temp : ${Math.floor((weatherObj.list[index].main.temp-273.15)*9/5+32)} F`);
        $(`#future${index}`).append(tempDiv);

        var humidityDiv = $("<div>");
        $(humidityDiv).text(`Humidity : ${weatherObj.list[index].main.humidity}%`);
        $(`#future${index}`).append(humidityDiv);
    }

}

