require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const authRoutes = require('./routes/auth')
const articleRoutes = require('./routes/articles')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)

// mongoose.connect(`mongodb+srv://admin-george:${process.env.MONGODB_PASSWORD}@cluster0-shird.mongodb.net/horizonDB?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology:true},err=>{
mongoose.connect(
  `mongodb://admin-george:${process.env.MONGODB_PASSWORD}@cluster0-shard-00-00-shird.mongodb.net:27017,cluster0-shard-00-01-shird.mongodb.net:27017,cluster0-shard-00-02-shird.mongodb.net:27017/horizonDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log('Connection to Database Failed')
    } else {
      console.log('Connection to Database Successful')
    }
  }
)
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

//Serve Static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 3001

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`)
})
