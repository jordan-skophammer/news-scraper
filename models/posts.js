var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

var Posts = mongoose.model("Posts", PostsSchema);

module.exports = Posts;