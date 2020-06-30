const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://admin-george:${process.env.MONGODB_PASSWORD}@cluster0-shird.mongodb.net/horizonDB?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology:true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

let articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    date:String,
    authorEmail:String,
    authorName:String
});


let Article = new mongoose.model('Article',articleSchema);

module.exports = Article;