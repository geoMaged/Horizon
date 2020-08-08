require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Article = require('../models/Article');


router.post('/bookmark',authenticateToken, (req,res)=>{  
    const user = req.user;
    const articleId = req.body.article;

    User.findOneAndUpdate({email:user.email},{$addToSet:{bookmarks:articleId}},(err,doc)=>{
      if(err){
        res.sendStatus(500);
      }else{
        res.sendStatus(200);
    }
  })
  });
  
router.delete('/bookmark',authenticateToken, (req,res)=>{
  
  const user = req.user;
  const articleId = req.body.article; 
  User.findOneAndUpdate({email:user.email},{$pullAll:{bookmarks:[articleId]}},(err,doc)=>{
    if(err){
      res.sendStatus(500);
    }else{
      res.sendStatus(200);
    }
  })
  });
  
  router.get('/',authenticateToken, (req,res) => {
            
      Article.find({},function(err,foundArticles){
      if(err){
        console.log(err);
      }else{
        res.send(foundArticles.reverse());
      }
    })
  })
  
  router.post('/',authenticateToken,(req,res) => {
  
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
          User.findOneAndUpdate({email:userEmail},{$push:{articles:doc._id}},(err,doc)=>{
            if(err){
              console.log(err);
            }else{
              res.sendStatus(200);
            }
          })
        }
    });
   
  });
  

  router.put('/',authenticateToken,(req,res) => {
  
    console.log(req.body);
    const title = req.body.article.title;
    const content=req.body.article.content;
    const date = new Date().toDateString().split(" ");
    const savedDate = date[1] +" " + date[3];
    const id=req.body.id;
    Article.findByIdAndUpdate(id,{title:title,content:content,date:savedDate},{new:true},(err,updatedArticle)=>{
      if(err){
        res.sendStatus(500);
      }else{
        console.log(updatedArticle);
        res.sendStatus(200);
      }
    })
  });

  
  router.delete('/',authenticateToken,(req,res) => {
  
    Article.deleteOne({_id:req.body.article},function(err){
      if(err){
        console.log(err);
        res.sendStatus(500)
      }
      else{
        const userEmail = req.user.email;
        User.findOneAndUpdate({email:userEmail},{$pullAll:{articles:[req.body.article]}},(err,doc)=>{
          if(err){
            res.sendStatus(500);
          }else{
            res.sendStatus(200);
          }
        })
      }
    });
  });

  router.get('/myarticles',authenticateToken,(req,res)=>{
  
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
  
  router.get('/bookmark',authenticateToken,(req,res)=>{
  
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
  
  router.get('/author',authenticateToken,(req,res)=>{
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
  
  router.get('/:article',authenticateToken,function(req,res){
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
                    article:foundArticle,
                    authorEmail:foundArticle.authorEmail
                  });
                }else{
                  res.json({
                    bookmark:false,
                    article:foundArticle,
                    authorEmail:foundArticle.authorEmail
                  });
                }
              }else{
                console.log("NO USER");
                
              }
              
            })
           
        }
    })
  })
  
  function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization'];
  //console.log("AuthHeader " + authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  //console.log("Token " + token);
  if(token===null) return res.sendStatus(401);
  
  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,user)=>{
    //console.log(user);
    if(err) return res.sendStatus(403);
    req.user=user.user;
    next();
  });
  }

module.exports = router;