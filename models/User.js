const mongoose  = require('mongoose');
mongoose.connect(`mongodb+srv://admin-george:${process.env.MONGODB_PASSWORD}@cluster0-shird.mongodb.net/horizonDB?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology:true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


let userSchema = new mongoose.Schema({
    googleId:String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    articles:[String],
    bookmarks:[String]
  });
  
  
let User = new mongoose.model('User',userSchema);

module.exports = User;