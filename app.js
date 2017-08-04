//dependancy requirement for libraries
const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Create app instance for express
app.use(express.static('public'));
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());


app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
//-^


//connect to mongodb through mongoose ('coolcarsdb' is database name)
mongoose.connect('mongodb://localhost:27017/coolcarsdb');


const carsSchema = new mongoose.Schema({
  model: {type: String, required: true},
  maker: String,
  horsepower: Number,
  engine: String,
  year: Number,
  description: String,
  kind: {type: String, lowercase: true, default:'car'},
  imageURL: String,
});

const Coolcar = mongoose.model('Coolcar', carsSchema);
var car = new Coolcar({
  model: "Road Runner",
  maker: 'Plymouth',
  engine: '',
  horsepower: 335,
  year: 1970,
  description: 'another cool car',
  kind: "musclecar",
  imageURL: "https://cdn.barrett-jackson.com/staging/carlist/items/Fullsize/Cars/90927/90927_Front_3-4_Web.jpg",
});



// car.save().then(function(){
//   //actions after succesful save
//   console.log("car saved");
// }).catch(function(e){
//   console.log('mongo cant save car', e);
//   //handle error
// });




app.get('/', function(req, res){
  res.redirect('/coolcars');
});

app.get('/coolcars', function (req, res){
  Coolcar.find().then(function(cars){
    res.render('allcars', {cars} );
  }).catch(function(e){
    console.log('heres the problem: ',e)
  });
});

app.listen(3000, function(){
  console.log('heard u like cool cars');
});
