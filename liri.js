var theKeys = require("./keys.js"),
    keyList = theKeys.twitterKeys,
    twitter = require('twitter'),
    spotify = require('spotify'),
    request = require('request'),
    fs = require('fs'),
    chalk = require('chalk'),
    blue = chalk.blue,
    red = chalk.red,
    cyan = chalk.cyan,
    green = chalk.green,
    magenta = chalk.magenta,
    oops = chalk.bgRed,
    command = process.argv[2],
    search = process.argv[3];

// switch statements determines which function to run
switch (command) {
    case 'my-tweets':
        console.log(red('...Getting Tweets...'));
        twitterA();
        break;
    case 'spotify-this-song':
        console.log(red('...Searching for Song...'));
        spotifyA();
        break;
    case 'movie-this':
        console.log(red('...Searching for Movie...'));
        movieA();
        break;
    case 'do-what-it-says':
        console.log(red('...Doing What it Says...'));
        doThis();
        break;
    default:
        console.log(oops('Something went Wrong... Try again'));
} // end switch statement


function twitterA() {
    var client = new twitter({
        consumer_key: keyList.consumer_key,
        consumer_secret: keyList.consumer_secret,
        access_token_key: keyList.access_token_key,
        access_token_secret: keyList.access_token_secret
    });

    var params = {screen_name: 'arielbear99'};

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            throw oops(error);
        }
        var tweetArray = tweets;
        for (var i = 0; i < tweetArray.length; i++) {
            console.log(green(tweetArray[i].created_at) + ' - ' + cyan(tweetArray[i].text));
        }
        fs.appendFile('log.txt', "arielbear99's most recent tweet: " + tweetArray[0].created_at + " - " + tweetArray[0].text + "\n", function(error) {
            if (error) {
                throw (error);
            }
        })
    })
} // end twitter() function


function spotifyA() {
    if (search === undefined) {
        search = 'The Sign';
    }
    ;
    spotify.search({type: 'track', query: search, limit: 1}, function (error, data) {
        if (error) {
            throw oops(error);
        }
        console.log(magenta('Artist(s): ' + data.tracks.items[0].album.artists[0].name));
        console.log(magenta('Song: ' + data.tracks.items[0].name));
        console.log(magenta('Preview Link: ' + data.tracks.items[0].preview_url));
        console.log(magenta('Album: ' + data.tracks.items[0].album.name));
        fs.appendFile('log.txt', "Spotify-ed this song: " + data.tracks.items[0].name + " by " + data.tracks.items[0].album.artists[0].name + "\n", function(error) {
            if (error) {
                throw (error);
            }
        })

    });
} // end spotifyA() function

function movieA() {
    var movieName = search.replace(/ /g, '+');
    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&tomatoes=true';

    request(queryUrl, function (error, response, data) {
        if (error) {
            throw oops(error);
        }
        var movie = JSON.parse(data);
        console.log(blue('Title: ' + movie.Title));
        console.log(blue('IMDB Rating: ' + movie.imdbRating));
        console.log(blue('Country Produced: ' + movie.Country));
        console.log(blue('Language: ' + movie.Language));
        console.log(blue('Plot: ' + movie.Plot));
        console.log(blue('Actors: ' + movie.Actors));
        console.log(blue('Rotten Tomatoes Rating: ' + movie.tomatoRating));
        console.log(blue('Rotten Tomatoes URL: ' + movie.tomatoURL));
        fs.appendFile('log.txt', "Movie-ed this: " + movie.Title + " with " + movie.Actors + "\n", function(error) {
            if (error) {
                throw (error);
            }
        })
    });

} // end movieA() function

function doThis() {
    // reading random.txt
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            throw oops(error);
        }
        // finds index of comma in .txt file. Splits two parts of .txt files, assigns them to new vars, re-assigns these vars to command and search vars
        var splitIndex = data.indexOf(',');
        var thisCommand = data.substring(0, splitIndex);
        var thisSearch = data.substring(splitIndex + 1);
        command = thisCommand;
        search = thisSearch;

        // runs switch statement
        switch (command) {
            case 'my-tweets':
                console.log(chalk.bgGreen.gray('... it said to Get Tweets! I\'m doin what it says!'));
                twitterA();
                break;
            case 'spotify-this-song':
                console.log(chalk.bgGreen.gray('... it said to Spotify that Song! I\'m doin what it says!'));
                spotifyA();
                break;
            case 'movie-this':
                console.log(chalk.bgGreen.gray('... it said to Search Movies! I\'m doin what it says!'));
                movieA();
                break;
            default:
                console.log(oops('Something went Wrong... Try again'));
        }
        ;
    });
} // end doThis() function