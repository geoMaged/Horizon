require('dotenv').config()
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10;

router.post('/register',(req,res)=> {
  
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
          bcrypt.hash(userPassword,saltRounds,function(err,hash){
            if(err){
              console.log(err);
            }else{
              const newUser = new User({
                email: userEmail,
                password: hash,
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
                  const accessToken = jwt.sign({user:savedUser},process.env.ACCESS_TOKEN_SECRET)
                  console.log(accessToken);
                  res.json({
                    page:'Home',
                    accessToken:accessToken,
                    name:newUser.firstName,
                    email:newUser.email
                  });
                  console.log(newUser);
                }
              });
            }
          });
        }else{
          console.log(userEmail);
          res.json({
            page:'Register'
          });
        }
      }
    }) 
  }); 
  
  
  
  router.post('/login',(req,res)=> {
    console.log(req.body);
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    User.findOne({email:userEmail}, (err,foundUser) => {
      if(err){
        console.log(err);
      }else{
        if(foundUser){
          bcrypt.compare(userPassword, foundUser.password,function(err,result){
            if(err){
              console.log(err);
            }else{
              if(result==true){
                const savedUser={
                  email: foundUser.email,
                  firstName:foundUser.firstName,
                  lastName:foundUser.lastName
                }
                const accessToken = jwt.sign({user:savedUser},process.env.ACCESS_TOKEN_SECRET);
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
          });
        }else{
          res.json({
            page:'Login'
          })
        }
      }
    })
  });
  
module.exports= router;