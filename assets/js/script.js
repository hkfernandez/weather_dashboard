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
            .text("header")
    );
    // aside w/ search bar and list of recent cities
    $("#mainContainer").append(
        $("<aside>")
            .attr("id", "citySelectionPane")
            .text("city selection pane")
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
            .text ("recent cities")
    )
    // main content w/ current conditions and future conditions
    $("#mainContainer").append(
        $("<main>")
            .attr ("id", "conditionsPane")
            .text ("conditions pane")
            .append (
                $("<section>")
                    .attr ("id", "currentConditionsPane")
                    .text("current conditions pane")
            )
    );
    $("#conditionsPane").append(
        $("<section>")
            .attr ("id", "futureConditions")
            .text ("future conditions pane")
    );

var APIKey = "40a8eac704499a683458b2a328507962"
var currentDate = dayjs ().format('HH');;

function pullRecentCities() {
    return JSON.parse(localStorage.getItem("weatherRecentCitiesArr"));
    console.log("recent cities in pull function = " +JSON.parse(localStorage.getItem("weatherRecentCitiesArr")));

}

function pushRecentCities (arr) {
    localStorage.setItem ("weatherRecentCitiesArr", JSON.stringify(arr));
}


function addCityToRecentCitites (userInputCity) {
    var recentCitiesArr = pullRecentCities();
    // console.log("cities array in addToRecentCitiesFunction = " +recentCitiesArr);
    if (recentCitiesArr == null) {
        var recentCitiesArr = [];
    }
    if (recentCitiesArr.includes(userInputCity) == false) {
        if (recentCitiesArr.length < 8) {
            recentCitiesArr.unshift(userInputCity);
        } else {
            recentCitiesArr.splice(recentCities.length-1,1,userInputCity)
        }
    }
    pushRecentCities (recentCitiesArr);
    appendRecentCities ();
}

function appendRecentCities () {
    $("#recentCitiesPane").empty();
    var recentCitiesArr = pullRecentCities();
    for (let index = 0; index < recentCitiesArr.length; index++) {
        const city = $("<button>")
        $(city).val(recentCitiesArr[index]);
        $(city).text(recentCitiesArr[index]);
        $(city).attr("class", "recentBtn");
        $("#recentCitiesPane").append(city);
    }
}

appendRecentCities ();



// on click search - calls getCityInfo() which calls addCityToCurrentCities()
$("#searchBtn").on("click", getCityInfo);

function getCityInfo () {
    var userInput = $("#searchBar").val();
    var addressFutureConditions = `http://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=40a8eac704499a683458b2a328507962`;
    var addressCurrentConditions = `http://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=40a8eac704499a683458b2a328507962`
    var addressOneCallWeather = 
    // var callParameters = "";
    $("#searchBar").val("");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Minneapolis,MN&appid=" + APIKey;
    // console.log(userInput);
    addCityToRecentCitites(userInput);
    
    $.ajax({
        url: addressFutureConditions,
        method: "GET"
      }).then(function(futureConditions) {
        console.log(futureConditions);
        // postFutureConditions(furtureConditions);
      });

      $.ajax({
        url: addressCurrentConditions,
        method: "GET"
      }).then(function(currentConditions) {
        console.log(currentConditions);
        postCurrentConditions(currentConditions);
      });
    
}

function postCurrentConditions (weatherObj) {
    $("#currentConditionsPane").empty();

    var cityName = $("<span>");
    $(cityName).text(weatherObj.name);
    $("#currentConditionsPane").append(cityName);

    var date = $("<span>");
    $(date).text(currentDate);
    $("#currentConditionsPane").append(date);



}
