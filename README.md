# Dixby / Liri

### This CLI interface is like a personal-assistant to display recent Tweets, search music, or display movie details.

#### How to Install and Run the Application

1. Install the app by cloning this repo and navigating to the file in the command line.
2. Remember to `npm install` so the dependencies are loaded to your local copy of the app.
3. Run the application by typing one of the following commands in the command line:
   * `node liri.js my-tweets`
   * `node liri.js spotify-this-song` + song name
   * `node liri.js movie-this` + movie name
   * `node liri.js do-what-it-says`

##### My Tweets
* Displays [my](https://twitter.com/arielbear99) most recent Tweets.
* Uses the [Twitter npm package](https://www.npmjs.com/package/twitter) to make calls to [Twitter REST API](https://dev.twitter.com/rest/public).

##### Spotify This Song
* Searches for and displays song details.
* Uses the [Spotify npm package](https://www.npmjs.com/package/spotify) to make calls to [Spotify API](https://developer.spotify.com/web-api/).
* _Note: if you do not designate a song, Dixby/Liri will search for __The Sign by Ace of Bass__ for you._

##### Movie This
* Searches for and displays movie details.
* Uses the [Request npm package](https://www.npmjs.com/package/request) to make calls to [OMDB API](http://www.omdbapi.com/).
* _Note: if you do not designate a movie, Dixby/Liri will search for __Mr. Nobody__ for you._

##### Do What It Says
* This function reads the _random.txt_ file and executes the command saved within the file.

#### Assignment

* This application is an [assignment](https://github.com/UCF-Coding-Boot-Camp/01-2017-VW-Class-Content/blob/master/Homework/Week-10/Instructions/homework_instructions.md "Homework #10") excecuted by [Ariel M. Costa,](https://github.com/amcosta9 "Ariel Costa GitHub") for UCF Coding Bootcamp, Spring Cohort 2017.