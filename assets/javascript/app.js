// Initial array with topics
var topics = ["hamster","bird","turtle"]

$(document.body).on("click", ".select", function() {

  var apikey = "57fd7b1be3b84af394c2693c04cb788d";
  var animal = $(this).attr("data-info");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apikey +
  "&limit=10";

  // // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  // After the data comes back from the API
  .done(function(response){
    $("#topic").empty();
    var results = response.data;
    console.log(results);
    for (var i = 0; i<results.length; i++){

      if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
        var gifDiv = $("<div class= 'item'>");
        var imageUrlS = results[i].images.fixed_height_still.url;
        var imageUrlA = results[i].images.fixed_height.url;
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating)
        var animalImg = $("<img>");
        animalImg.attr("src", imageUrlS);
        animalImg.attr("alt","image");
        animalImg.attr("data-still", imageUrlS);
        animalImg.attr("data-animate", imageUrlA);
        animalImg.attr("data-state", "still");
        animalImg.addClass("gif");
        gifDiv.append(p);
        gifDiv.prepend(animalImg);
        $("#topic").prepend(gifDiv);
      }
    } 
  });
});


//Function that creates buttons for array
var createBtns = function(){
  $("#topic-Btns").empty();
  for (var i = 0; i < topics.length; i++){
  	var button = $("<button>");
  	button.addClass("select");
  	button.attr("data-info",topics[i]);
  	button.text(topics[i]);
    $("#topic-Btns").append(button);
  };
}

createBtns();

// This function handles events where a movie button is clicked
$("#add-Topic").on("click", function(event) {
  event.preventDefault();
    if($("#topic-input").val() !== ""){
      // This line grabs the input from the textbox
      var userInput = $("#topic-input").val().trim();

      // Adding movie from the textbox to our array
      topics.push(userInput);

      // Calling renderButtons which handles the processing of our movie array
      createBtns();
      $("#topic-input").val("");
    }
});

$(document.body).on("click", ".gif", function(){
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
  else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state","still");
  }
});
