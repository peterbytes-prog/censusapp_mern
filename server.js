const mongoose = require("mongoose");

var mongoDB = 'mongodb://127.0.0.1/censusdb';

mongoose.connect(mongoDB, {useNewUrlParser:true,
useUnifiedTopology:true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, "MongoDB failed to connect"));
db.on('connected', console.log.bind(console, "MongoDb connected successfully"));
   

const express = require('express');
const app = express();

const PORT = 8081;

app.use(express.json());
app.use("/api", require('./route/request'));

app.listen(PORT, ()=>{
    console.log(`Sever listening on ${PORT}`);
})