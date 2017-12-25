 var topics = ["apples", "oranges", "grape", "bananna"];

     function displayMovieInfo() {
     	var key = "S2HnC7Z1uYy73NHZn7uyFGxvb1gHX9rg";
        var topic = $(this).attr("data-name");
        //var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
         var queryURL = "http://api.giphy.com/v1/gifs/search?q= "+ topic + "&api_key="+ key +"&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response);
        	//alert("hey")

          // Creating a div to hold the movie
          var movieDiv = $("<div class='movie'>");
for(var i=0; i < response.data.length; i++){

          // Storing the rating data
          var rated = response.data[i].rating;
          //alert(rated);

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rated);

          // Displaying the rating
          movieDiv.append(pOne);


          var imgURL = response.data[i].images.original_still.url;

          // Creating an element to hold the image
         var image = $("<img>").attr("src", imgURL);

          // Appending the image
          movieDiv.append(image);
          
          // Putting the entire movie above the previous movies
          $("#movies-view").append(movieDiv);

        }
});
}



       function renderButtons() {

        // Deleting the movie buttons prior to adding new movie buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#movies-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("topics");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#movies-view").append(a);
        }
      }
          // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
       event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
       topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
       renderButtons();
    });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".topics", displayMovieInfo);
       renderButtons();