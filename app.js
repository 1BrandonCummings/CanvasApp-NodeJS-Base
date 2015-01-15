var fs = require('fs');
var express = require('express');
var sftools = require('./sf-tools');
var http = require('http');

var app = express();
var PORT = process.env.PORT || 8064; 

//SF app secret
var SF_CANVASAPP_CLIENT_SECRET = process.env.SF_CANVASAPP_CLIENT_SECRET;

app.configure(function() {
    app.use('/public',express.static(__dirname + '/public'));
    
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/views');

    app.set('view engine', 'html');
    app.use(express.cookieParser());

    //session enabled to store token data
    app.use(express.session({
      secret: 'cs secret'
    }));

    app.use(express.bodyParser());
    app.use(express.logger());
    
}); 


// Set the height and width explicitly.

app.get('/',function(req,res){
    //get the canvas details from session (if any)
    var canvasDetails = sftools.getCanvasDetails(req);
    //the page knows if the user is logged into SF
    res.render('index',{canvasDetails : canvasDetails});
});

//canvas callback
app.post('/canvas/callback', function(req,res){
    sftools.canvasCallback(req.body, SF_CANVASAPP_CLIENT_SECRET, function(error, canvasRequest){
        if(error){
            res.statusCode = 400;
            return res.render('error',{error: error});
        }
        //saves the token details into session
        sftools.saveCanvasDetailsInSession(req,canvasRequest);
        return res.redirect('/');
    });
});
// var server = http.createServer({}, app).listen(8064, function(){
//     console.log("server started at port 3000");
// });

exports.server = app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});

// <p style="overflow:auto; height: 400px;"><%=JSON.stringify(canvasDetails,undefined,2)%></p>