require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const indexRoutes = require('../Backend/routes/indexRoutes');
const loginRoutes = require('../Backend/routes/Login'); 
const findOrCreate = require('mongoose-findorcreate');

//This line made the Local Strategy method defined. It was undefined before using it.
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(cors());
app.use(indexRoutes);
app.use(loginRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));

// app.use(passport.initialize());
// app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/horizonDB', {useNewUrlParser: true,useUnifiedTopology:true});
//mongoose.set('useCreateIndex',true);  //To solve Deprecation Error

/* Mongoose Database */


let articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    date:Date,
    authorEmail:String
});


let userSchema = new mongoose.Schema({
    googleId:String,
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    articles:[String],
    bookmarks:[String]
});

// userSchema.plugin(passportLocalMongoose); //to save passwords with hash and salts in our mongodb 
// userSchema.plugin(findOrCreate);

let User = new mongoose.model('User',userSchema);
let Article = new mongoose.model('Article',articleSchema);

// use static authenticate method of model in LocalStrategy
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));
 
// use static serialize and deserialize of model for passport session support
//passport.serializeUser(User.serializeUser());//These are used instead of the ones on Passport because of the package passport-local-mongoose
//passport.deserializeUser(User.deserializeUser());
  
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });


// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
//   });


app.get('/articles',(req,res) => {
            
      Article.find({},function(err,foundArticles){
      if(err){
        console.log(err);
      }else{
        res.send(foundArticles);
      }
    })
})

app.post('/article',(req,res) => {
    const newArticle = req.body;
    const article = new Article(newArticle);
    console.log(req.body);
    article.save(err =>{
        if(err){
            console.log(err);
        }else{
            console.log(req.session);
        } 
    });
});

app.get('/articles/view/:article',function(req,res){
    console.log(req.params);
    Article.findById(req.params.article, (err,foundArticle)=>{
        if(err){
            console.log(err);
        }else{
            res.send(foundArticle);
        }
        
    })
})

app.post('/login',(req,res)=> {
    
  User.findOne({email:req.body.email , password:req.body.password}, (err,foundUser) => {
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        res.send('Home');
      }else{
        res.send('Login');
      }
    }
  })
})

app.post('/register',(req,res)=> {
  
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const fName = req.body.firstName;
  const lName = req.body.lastName;
   
  User.findOne({email:userEmail},function(err,foundUser){
    if(err){
      console.log("First: " +err);
    }else{
      console.log(foundUser);
      if(!foundUser){
        console.log("HERE");
        const newUser = new User({
          email: userEmail,
          password: userPassword,
          firstName:fName,
          lastName: lName,
          articles:[],
          bookmarks:[]
        });

        newUser.save(err =>{
          if(err){
            console.log("Second" + err);
          }else{
            res.send('Home');
          }
        });
        console.log(newUser);
        req.session.user = newUser;
      }else{
        res.send('Register');
      }
    }
  })
  


  
}); 

app.listen(3001, (req,res)=> {
    console.log('Server is running on port 3001.');
})