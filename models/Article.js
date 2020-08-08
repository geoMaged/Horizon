const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    date:String,
    authorEmail:String,
    authorName:String
});


let Article = new mongoose.model('Article',articleSchema);

module.exports = Article;