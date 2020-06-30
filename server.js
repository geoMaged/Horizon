const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, "client", "build")))

app.use('/api/auth',authRoutes);
app.use('/api',articleRoutes);

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