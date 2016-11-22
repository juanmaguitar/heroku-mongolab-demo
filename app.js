const express = require('express')
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use( express.static('public') )

const ENVIRONMENT = process.env.ENVIRONMENT || 'development';
const PORT = process.env.PORT || 3000;

var urlDB = 'mongodb://localhost:27017/test';

// Connection URL
if (ENVIRONMENT === 'production') {
	urlDB = 'mongodb://admin:admin12345@ds047030.mlab.com:47030/restaurants-demo';
}

console.log(`Connecting to DB: ${urlDB}`)

MongoClient.connect(urlDB, (err, db) => {

  if (err) throw("There were problems connecting to the DB server...");

	app.get('/restaurants', (req, res) => {

	  db.collection('restaurants')
	      .find({})
	      .limit(10) // cursor
	      .toArray() // promise
	      .then( restaurants => { res.json(restaurants) } );

	});

});

app.listen(PORT, ()=> console.log("Listening on 3000..."))