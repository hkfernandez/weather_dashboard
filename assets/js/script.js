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
            .append (
                $("<button>")
                    .text("save")
            )
    );
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

