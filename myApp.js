var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
const { stat } = require('fs');
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})


app.use("/public", express.static(__dirname + "/public"));


console.log("Hello World");
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();
},
    (req, res) => {
        res.json({"time" : req.time});
})

app.get('/:word/echo', (req, res) => {
    res.json({"echo" : req.params.word});
});

app.route('/name').post((req, res) => {
    var string = req.body.first + ' ' + req.body.last;
    res.json({"name": string});
});


app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE == "uppercase")
    {
        res.json({"message" : "HELLO JSON"});
    }
    else
    {
        res.json({"message" : "Hello json"});
    }
})


































 module.exports = app;
