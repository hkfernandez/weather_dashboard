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
    city is set to current city
    weather is dislayed for current city
when user click on a recent city
    city is set to current city
    weather is displayed for curent city

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
 
    $("#citySectionPane").append(
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
var recentCities =[""]

function pullRecentCitiesLocalStorage (){
    recentCities = localStorage.getItem (JSON.parse("weatherRecentCiteiesArr"));
}

function addCityToRecentCitites (userInputCity) {
    if (!recentCities.includes(userInputCity)) {
        if (recentCities < 8) {
            recentCities.unshift(userInputCity);
        } else {
            recentCities.splice(0,1,userInputCity)
        }
    }
}

// on click search - calls getCityInfo() which calls addCityToCurrentCities()
$("#searchButtn").on("click", getCityInfo);

function getCityInfo () {
    // var userInput = $("#searchBar").val();
    var userInput = "Raleigh,NC"
    var address = 'api.openweathermap.org/data/2.5/forecast?q=Minneapolis&appid=40a8eac704499a683458b2a328507962';
    var callParameters = "";
    // $("#searchBar").val("");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Minneapolis,MN&appid=" + APIKey;
 
addCityToRecentCitites (userInput)
console.log(recentCities);

// if ()


    $.ajax({
        url: address,
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });


}

//     $.ajax({
//         type: "GET",
//         url: address,
//         success: function (response) {
//             console.log (response);
//         }
//     });   
// };


getCityInfo ();