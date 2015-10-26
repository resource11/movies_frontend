'use strict';

// invokes the function passed to ready
// after the DOM has fully loaded

$(document).ready(function() {
  // get the DOM element for the ul
  // with the id attribute of 'movies'
  var $movieList = $('#movies');

  // the URL of a JSON file that contains
  // a list of movies
  var movies_url = "http://localhost:5000/movies.json"


  // begin click handler

  // when the user click a button with the id attribute
  // of 'movies_button', we will fire an anonymous
  // function passed to the .on() method
  $('#movies_button').on('click', function(event){

    // Make an AJAX request to get the
    // above JSON file

    // AJAX is a method on jQuery that takes an object
    // and makes an http request

    // $.ajax returns a promise (an object) and a promise will
    // have a number of methods. Two of these methods
    // are 'done' and 'fail'
    var responsePromise = $.ajax({
      method: 'GET',
      url: movies_url,
      dataType:'json'
    });



    // we can create an anonymous function inline, or
    // we can create an explicit function and pass it in
    // to the .done() method

    // we'll create an explicit function for this example

    // the parameter 'moviesData' here is actually
    // a note to use that the argument that will be
    // passed in to this function will be
    // the data we *receive* back from the http request
    // which is, in this case, the movies.json file
    // formatted into a string
    var moviesResponseHandler = function(moviesData) {
      // in JS you can use a comma in a console.log
      // instead of a '+' to concatenate on a variable
      // I think you can do the same in Ruby for the
      // puts and print statements
      console.log("moviesData is ", moviesData);
      // take the string formatted as JSON and convert
      // it to a JS object named 'movies'
      var movies = JSON.parse(moviesData);
      console.log("movies are " + movies);

      // for each movie, create a list element '<li>'
      // and append the movie name property value
      // and append it to the ul.
      movies.forEach(function(movie){
        $movieList.append("<li>" + movie.name + "</li>");
      });
    };


    // the Promise object's 'done' method will invoke
    // the function passed to it when the server
    // sends an HTTP Reply
    responsePromise.done(moviesResponseHandler);

  });
  // end click handler


});
// end document ready
