require("dotenv").config();

var userInput = process.argv[2];
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


if (userInput === "my-tweets") {
    var params = {screen_name: 'COnthecob'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    for (i=0; i < 20; i++) {
        if (tweets[i]) {
            console.log("---------------------------------------------");
            console.log("Tweet Text:" + tweets[i].text);
            console.log("Tweet Created At:" + tweets[i].created_at);

        }
    }
    });
}

if (userInput === "spotify-this-song") {
    var trackName = "";
    for (i = 3; i < process.argv.length; i++) {
        trackName += process.argv[i] + " ";
    }
    if (trackName === "") {
        spotify.search({ type: 'track', query: "The Sign Ace of Base" }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            else {
                console.log("Artist Name:" + data.tracks.items[0].artists[0].name);
                console.log("Track Name:" + data.tracks.items[0].name);
                console.log("Preview URL:" + data.tracks.items[0].preview_url);
                console.log("Album Name:" + data.tracks.items[0].album.name);
            }
        });
    }
    else {
        spotify.search({ type: 'track', query: trackName }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
            else {
                console.log("Artist Name:" + data.tracks.items[0].artists[0].name);
                console.log("Track Name:" + data.tracks.items[0].name);
                console.log("Preview URL:" + data.tracks.items[0].preview_url);
                console.log("Album Name:" + data.tracks.items[0].album.name);
            }
        });
    }
}

if (userInput === "movie-this") {
    var movieName = "";
    for (i = 3; i < process.argv.length; i++) {
        movieName += process.argv[i] + " ";
    }
    console.log(movieName)
    if (movieName === "") {
        request('http://www.omdbapi.com/?apikey=trilogy&t=mr_nobody' , function (error, response, body) {
            if (error) {
                console.log('error:', error); 
            }
            var response = JSON.parse(body);
            console.log("Title:" + response.Title); 
            console.log("Year:" + response.Year); 
            console.log("IMDB Rating:" + response.imdbRating); 
            console.log("RottenTomatoes Rating:" + response.Ratings[1].Value); 
            console.log("Country:" + response.Country); 
            console.log("Language:" + response.Language); 
            console.log("Plot:" + response.Plot); 
            console.log("Actors:" + response.Actors); 
        });
    }
    else {
        request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieName, function (error, response, body) {
            if (error) {
                console.log('error:', error); 
            }
            var response = JSON.parse(body);
            console.log("Title:" + response.Title); 
            console.log("Year:" + response.Year); 
            console.log("IMDB Rating:" + response.imdbRating); 
            console.log("RottenTomatoes Rating:" + response.Ratings[1].Value); 
            console.log("Country:" + response.Country); 
            console.log("Language:" + response.Language); 
            console.log("Plot:" + response.Plot); 
            console.log("Actors:" + response.Actors); 
        });
    }
}

if (userInput === "do-what-it-says") {
    var command = [];
    fs.readFile("random.txt","utf8", function(error, data) {
        if (error) {
            return console.log(error);
          }
        command = data.split(",");
        if (command[0] === "my-tweets") {
            var params = {screen_name: 'COnthecob'};
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
            for (i=0; i < 20; i++) {
                if (tweets[i]) {
                    console.log("---------------------------------------------");
                    console.log("Tweet Text:" + tweets[i].text);
                    console.log("Tweet Created At:" + tweets[i].created_at);
        
                }
            }
            });
        }
        
        if (command[0] === "spotify-this-song") {
            if (command[1] === "") {
                spotify.search({ type: 'track', query: "The Sign Ace of Base" }, function(err, data) {
                    if ( err ) {
                        console.log('Error occurred: ' + err);
                        return;
                    }
                    else {
                    console.log("Artist Name:" + data.tracks.items[0].artists[0].name);
                        console.log("Track Name:" + data.tracks.items[0].name);
                        console.log("Preview URL:" + data.tracks.items[0].preview_url);
                        console.log("Album Name:" + data.tracks.items[0].album.name);
                    }
                });
            }
            else {
                spotify.search({ type: 'track', query: command[1] }, function(err, data) {
                    if ( err ) {
                        console.log('Error occurred: ' + err);
                        return;
                    }
                    else {
                    console.log("Artist Name:" + data.tracks.items[0].artists[0].name);
                        console.log("Track Name:" + data.tracks.items[0].name);
                        console.log("Preview URL:" + data.tracks.items[0].preview_url);
                        console.log("Album Name:" + data.tracks.items[0].album.name);
                    }
                });
            }
        }
        
        if (command[0] === "movie-this") {
            if (command[1] === "") {
                request('http://www.omdbapi.com/?apikey=trilogy&t=mr_nobody' , function (error, response, body) {
                    if (error) {
                        console.log('error:', error); 
                    }
                    var response = JSON.parse(body);
                    console.log("Title:" + response.Title); 
                    console.log("Year:" + response.Year); 
                    console.log("IMDB Rating:" + response.imdbRating); 
                    console.log("RottenTomatoes Rating:" + response.Ratings[1].Value); 
                    console.log("Country:" + response.Country); 
                    console.log("Language:" + response.Language); 
                    console.log("Plot:" + response.Plot); 
                    console.log("Actors:" + response.Actors); 
                });
            }
            else {
                request('http://www.omdbapi.com/?apikey=trilogy&t=' + command[1], function (error, response, body) {
                    if (error) {
                        console.log('error:', error); 
                    }
                    var response = JSON.parse(body);
                    console.log("Title:" + response.Title); 
                    console.log("Year:" + response.Year); 
                    console.log("IMDB Rating:" + response.imdbRating); 
                    console.log("RottenTomatoes Rating:" + response.Ratings[1].Value); 
                    console.log("Country:" + response.Country); 
                    console.log("Language:" + response.Language); 
                    console.log("Plot:" + response.Plot); 
                    console.log("Actors:" + response.Actors); 
                });
            }
        }
    });
    
}

