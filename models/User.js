const mongoose = require('mongoose');

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