var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

// var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// var mongodb = mongodb:<dbuser>:<dbpassword>@ds263670.mlab.com:63670/heroku_q00t7w80
// mongoose.Promise = Promise;
// mongoose.connect("mongodb://localhost/pitchfork_scraper");

app.get("/scrape", (req, res) => {

    request("https://pitchfork.com/features/", function(error, response, html) {

        var $ = cheerio.load(html);

        $(".title").each(element => {
            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");

            if (title && link) {
                console.log(title, link)
            }
        })
        
    })
})

app.listen(PORT, () => {
    console.log("App running on port " + PORT + "!");
});