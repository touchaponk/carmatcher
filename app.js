/**
 * Created by touchaponk on 19/01/2016.
 */
/**
 * Created by touchaponk on 25/10/2015.
 */
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var app = express();
var request = require('request');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
//app.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname + '/public/index.html'))
//});
var appEnv = cfenv.getAppEnv();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/analyze", function(req, res){
    var personality_insights = watson.personality_insights({
        username: 'ffad42d0-845c-450c-b313-6280d580ade0',
        password: 'Jqg01YUIZkRH',
        version: 'v2'
    });
    console.log("body ", req.body);
    personality_insights.profile({
            text: req.body.content,
            language: 'en' },
        function (err, response, body) {
            console.log(err, response);
            if (err)
                console.log('error:', err);
            else {
                res.status(200);
                res.json(response);
            }
        });
});
app.use(express.static('public'));
//var server = app.listen(1234, function () {
//    var host = server.address().address;
//    var port = server.address().port;
//    console.log('App running at http://%s:%s', host, port);
//})


// start server on the specified port and binding host
app.listen(appEnv.port?appEnv.port:1234, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});