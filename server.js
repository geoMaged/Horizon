require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const indexRoutes = require('./routes/indexRoutes');
const loginRoutes = require('./routes/Login'); 
const findOrCreate = require('mongoose-findorcreate');
//This line made the Local Strategy method defined. It was undefined before using it.
//const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();
app.use(cors());
app.use(indexRoutes);
app.use(loginRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, "client", "build")))

const ACCESS_TOKEN_SECRET="afd5318ba430fec603b04fb49bba0377c2a8b7d92b0c588c18366d4b2bda8e0397f8749e7a527da3e77239d9584de365b8925a3477ade7ae8a98aea12a7971b9"
const REFRESH_TOKEN_SECRET="968904dfdc06d7a3539e7a61c92e40e36be4b78d0d86261710842fe648b99bc543d8cc6d66e20383b314c252ba82450d0ef2ad3078e97bcefd81071088f3f4fe"


mongoose.connect('mongodb+srv://admin-george:lifewithnolimits@cluster0-shird.mongodb.net/horizonDB?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology:true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

/* Mongoose Database */

let articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    date:String,
    authorEmail:String,
    authorName:String
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


let User = new mongoose.model('User',userSchema);
let Article = new mongoose.model('Article',articleSchema);

//app.use('/', express.static(path.resolve(__dirname,'client','build')));

app.post('/addBookmark',authenticateToken, (req,res)=>{
 
    const user = req.user;
    const articleId = req.body.article;
    User.findOneAndUpdate({email:user.email},{$push:{bookmarks:articleId}},(err,doc)=>{
      if(err){
        console.log(err);
      }else{
      console.log(doc);
      
    }
  })
});

app.post('/removeBookmark',authenticateToken, (req,res)=>{
 
  const user = req.user;
  const articleId = req.body.article;  
  User.findOneAndUpdate({email:user.email},{$pullAll:{bookmarks:[articleId]}},(err,doc)=>{
    if(err){
      console.log(err);
    }else{
      console.log(doc);
    }
  })
});

app.get('/articles',authenticateToken, (req,res) => {
            

      Article.find({},function(err,foundArticles){
      if(err){
        console.log(err);
      }else{
        //console.log(foundArticles);
        res.send(foundArticles.reverse());
      }
    })
})

app.post('/article',authenticateToken,(req,res) => {
  
    const title = req.body.title;
    const content=req.body.content;
    const date = new Date().toDateString().split(" ");
    const savedDate = date[1] +" " + date[3];
    const userEmail=req.user.email;
    const name= req.user.firstName + " " + req.user.lastName;
    const article = new Article({
      title:title,
      content:content,
      date:savedDate,
      authorEmail:userEmail,
      authorName:name
    });
    article.save((err,doc) =>{
        if(err){
            console.log(err);
        }
        else{
          console.log(doc);
          User.findOneAndUpdate({email:userEmail},{$push:{articles:doc._id}},(err,doc)=>{
            if(err){
              console.log(err);
            }else{
              console.log(doc);
              
            }
          })
        }
    });
   
});

app.get('/myarticles',authenticateToken,(req,res)=>{
  
  const userEmail = req.user.email;
  User.findOne({email:userEmail},(err,foundUser)=>{
    if(err){
      console.log(err);
    }else{
      const myArtices = foundUser.articles;
      Article.find({_id:{$in:myArtices}},(err,foundArticles)=>{
        if(err){
          console.log(err);
        }
        else{
          res.json({
            myArticles:foundArticles.reverse()
          })
        }
      })
    }
  })
})

app.get('/bookmarks',authenticateToken,(req,res)=>{

  const userEmail=req.user.email;
  User.findOne({email:userEmail},(err,foundUser)=>{
    if(err){
      console.log("This error" + err);
    }else{
     const bookmarks = foundUser.bookmarks;
     Article.find({_id:{$in:bookmarks}},(err,foundArticles)=>{
       if(err){
         console.log(err);
       }else{
        res.json({
          bookmarks:foundArticles.reverse()
        })
       }
     })
    }
  });
})

app.get('/author',authenticateToken,(req,res)=>{
  console.log(req.query.email);
  const email = req.query.email;
  Article.find({authorEmail:email},(err,foundArticles)=>{
    if(err){
      console.log(err);
    }else{
      User.findOne({email:email},(err,foundUser)=>{
        if(err){
          console.log(err);
        }else{
          console.log(foundUser);
          const name = foundUser.firstName + " " + foundUser.lastName;
          res.json({
            name:name,
            articles:foundArticles.reverse()
          })
        }
      })
     
    }
  })
})

app.get('/articles/view/:article',authenticateToken,function(req,res){
    //console.log(req.params);
    Article.findById(req.params.article,(err,foundArticle)=>{
        if(err){
            console.log(err);
        }else{
            User.findOne({email:req.user.email}, (err,foundUser)=>{
              if(err) {
                console.log(err);
              }
              if(foundUser){
                if(foundUser.bookmarks.includes(req.params.article)){
                  res.json({
                    bookmark:true,
                    article:foundArticle
                  });
                }else{
                  res.json({
                    bookmark:false,
                    article:foundArticle
                  });
                }
              }else{
                console.log("NO USER");
                
              }
              
            })
           
        }
    })
})

app.post('/login',(req,res)=> {
    
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  User.findOne({email:userEmail , password:userPassword}, (err,foundUser) => {
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        const savedUser={
          email: foundUser.email,
          firstName:foundUser.firstName,
          lastName:foundUser.lastName
        }
        const accessToken = jwt.sign({user:savedUser},ACCESS_TOKEN_SECRET);
        res.json({
          page:'Home',
          accessToken:accessToken,
          name:foundUser.firstName,
          email:foundUser.email
        });
      }else{
        res.json({
          page:'Login'
        })
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
      console.log("Found User " + foundUser);
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
            console.log("Second " + err);
          }else{
            const savedUser={
              email: userEmail,
              firstName:fName,
              lastName:lName
            }
            const accessToken = jwt.sign({user:savedUser},ACCESS_TOKEN_SECRET)
            console.log(accessToken);
            res.json({
              page:'Home',
              accessToken:accessToken,
              name:newUser.firstName,
              email:newUser.email
            });
          }
        });
        console.log(newUser);
      }else{
        console.log(userEmail);
        res.json({
          page:'Register'
        });
      }
    }
  }) 
}); 

function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization'];
  //console.log("AuthHeader " + authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  //console.log("Token " + token);
  if(token===null) return res.sendStatus(401);

  jwt.verify(token,ACCESS_TOKEN_SECRET, (err,user)=>{
    //console.log(user);
    if(err) return res.sendStatus(403);
    req.user=user.user;
    next();
  });
}

// app.get('/verify',authenticateToken,(req,res)=>{
//   console.log("HERE ")
//   res.sendStatus(200);
// })

//Serve Static assets if in production 
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
  });
}

const port = process.env.PORT || 3001;

app.listen(port, (req,res)=> {
    console.log(`Server is running on port ${port}`);
})