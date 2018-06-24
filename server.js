var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var exphbs = require("express-handlebars");

var db = require("./models");

var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/trainerRoadDB");  

app.get("/scrape", (req, res) => {

  axios.get("http://blog.trainerroad.com/").then((response) => {

    var $ = cheerio.load(response.data);

    $(".post").each(function(i, element) {

      var results = {};

      results.title = $(this).text();
      results.link = $(this).children("a").attr("href");

      db.Posts.create(results)
        .then((dbPosts) => {

          console.log(dbPosts);
        })
        .catch((err) => {

          return res.json(err);
        });
    });
  });
});

app.get("/", (req, res) => {
    let hbsObject;
    db.Posts.find({}).then(dbPosts => {
        hbsObject = {
            documents: dbPosts
        }
        res.render("index", hbsObject)
    })

})

app.get("/posts", (req, res) => {

  db.Posts.find({})
    .then((dbPosts) => {
      res.json(dbPosts);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/posts/:id", (req, res) => {
  db.Posts.findOne({ _id: req.params.id })
    .populate("note")
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
});


app.post("/posts/:id", (req, res) => {

  db.Note.create(req.body)
    .then(dbNote => {db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then((dbPosts) => {
      res.json(dbPosts);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log("App running on port " + PORT + "!");
});