var express = require("express");
// var bodyParser = require("body-parser");
var path = require("path");

var app = express()
var PORT = process.env.PORT || 3030;


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static(path.join(__dirname, 'public')));


app.use( function(req, res) {
	  res.sendFile(path.join(__dirname + '/index.html'));
	});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
