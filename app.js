var fs = require('fs');
var express = require('express');
var sftools = require('./sf-tools');
var http = require('http');
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cookieParser = require('cookie-parser')
var morgan = require('morgan');             // log requests to the console (express4)
var session = require('express-session')
var requestify = require('requestify');
var Client = require('node-rest-client').Client;
var app = express();
var PORT = process.env.PORT || 8064; 

//SF app secret
var SF_CANVASAPP_CLIENT_SECRET = process.env.SF_CANVASAPP_CLIENT_SECRET;

mongoose.connect('mongodb://heroku_app33287905:4pdd0b7v63d13cqv0j4vjk6pmt@ds031571.mongolab.com:31571/heroku_app33287905');     //mongod --dbpath ~/Voxa_Salesforce/full_stack_test/test_ang_node_mongo/data/db



    app.use('/public',express.static(__dirname + '/public'));
    
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/views');

    app.set('view engine', 'html');
    app.use(cookieParser());

    //session enabled to store token data
    app.use(session({
  secret: 'Vwsi2013',
  resave: false,
  saveUninitialized: true
}))

    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(morgan('dev'));
    


// Set the height and width explicitly.

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

app.get('/',function(req,res){
    //get the canvas details from session (if any)
    var canvasDetails = sftools.getCanvasDetails(req);
    client = new Client();
    // client.get("https://mfvalvxsox.localtunnel.me/api/todos", function(data, response){
    //         // parsed response body as js object
    //         console.log(data);
    //         // raw response
    //         // console.log(response);
    //     });
//creates something in the database on Salesforce load

    var args = {
        
    

      data: { salesforce_record_id : JSON.stringify(canvasDetails.context.environment.record.Id, undefined, 2),
        salesforce_user_id : JSON.stringify(canvasDetails.context.user.user_id),
        email_body: "Hey Johnson,\n\nHope all is well, I am writing this to let you know that every single email in this entire database says the exact same thing.\n\nBest,\n\nBrandon",
        date_created: { type: Date, default: Date.now },
        subject: "So many email, so little time ",
        organization_id: JSON.stringify(canvasDetails.context.organization.organizationId),
        user_email: JSON.stringify(canvasDetails.context.user.email),
        record_type: JSON.stringify(canvasDetails.context.environment.record.attributes.type, undefined, 2),
        text: "derp!"

        // canvasDetails: canvasDetails
    },
        headers:{"Content-Type": "application/json"} 
    };

client.post("https://ferzapgrvf.localtunnel.me/api/emails", args, function(data, response){
            // parsed response body as js object
            console.log(data);
            // raw response
            // console.log(response);
        });

    //the page knows if the user is logged into SF
    res.render('index',{canvasDetails : canvasDetails});
});




//canvas callback

});
    
// var server = http.createServer({}, app).listen(8064, function(){
//     console.log("server started at port 3000");
// });

exports.server = app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});
// voxa.salesforce.localhost.com

// <p style="overflow:auto; height: 400px;"><%=JSON.stringify(canvasDetails,undefined,2)%></p>