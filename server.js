// https://docs.mongodb.com/drivers/node/current/quick-start/
// https://zellwk.com/blog/crud-express-mongodb/ 

console.log('May the Source be with You')
const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express();

// connect to database
const connectionString = "mongodb+srv://bruc3abdn:bruc3ABDN@cluster0.ky9uv.mongodb.net/star-wars-quotes?retryWrites=true&w=majority"
MongoClient.connect(connectionString, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    // Middleware parts
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    app.listen(3000, function() {
      console.log('listening on 3000')
    })
  // url handlers (routes)
    app.get('/', (req, res) => {
      if (err) return console.error(err)
     // const cursor = db.collection('quotes').find()
     db.collection('quotes').find().toArray()
     .then(results => {
      res.render('index.ejs', {quotes: results})
      results.forEach(doc => console.log(doc)) 
     })
     .catch(error =>console.error(error))
    })

    app.post('/quotes', (req, res) => {
      if (err) return console.error(err)
      quotesCollection.insertOne(req.body)
      console.log(req.body)
      res.redirect('/')
    })

    app.put('/quotes', (req, res) => {
      quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
        .then(result => res.json('Success'))
        .catch(error => console.error(error))
    })  

    app.delete('/quotes', (req, res) => {
      quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })
  })






// mongodb+srv://bruc3abdn:<password>@cluster0.ky9uv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


// mongo atlas bruc3abdn bruc3ABDN