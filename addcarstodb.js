//dependancy requirement for libraries
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Create app instance for express
const app = express();

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
  model: "",
  maker: '',
  engine: '',
  horsepower: 000,
  year: 000,
  description: '',
  kind: "",
  imageURL: "",
});


// console.log(car.toObject())

car.save().then(function(){
  //actions after succesful save
  console.log("car saved");
}).catch(function(e){
  console.log('mongo cant save car', e);
  //handle error
});
