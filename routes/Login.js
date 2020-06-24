const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

router.get('/login',(req,res) => {
    res.send('Login Route');
});

router.get('/register',(req,res) => {
    res.send('Register Route');
});

module.exports = router;
