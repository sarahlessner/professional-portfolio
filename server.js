var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express()
var PORT = process.env.PORT || 3030;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));




app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));


app.use( function(req, res) {
	  res.sendFile(path.join(__dirname + '/index.html'));
	});


// must specify options hash even if no options provided!
var phpExpress = require('php-express')({
 
  // assumes php is in your PATH
  binPath: 'php'
});
 
// set view engine to php-express
app.set('views', './views');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');
 
// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);
 
var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});



// app.listen(PORT, function() {
//   console.log("App listening on PORT " + PORT);
// });
