
var express = require('express');
var sftools = require('./sf-tools');
var app = express();
var h = require('./mine')

var PORT = process.env.PORT || 3000;
console.log("Hello World");

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/',function(req,res){
	var onehundred = h.hundredTimes(req)
	res.render('test', {onehundred : onehundred});
	console.log("Hello");
});

exports.server = app.listen(PORT, function() {
  console.log("Listening on " + PORT);
});
// fierce-brook-6144.herokuapp.com