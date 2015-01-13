
var express = require('express');
var sftools = require('./sf-tools');
var app = express();

var PORT = process.env.PORT || 3000;
console.log("Hello World");

exports.server = app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});