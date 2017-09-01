var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var path = require("path");

var app = express()
var PORT = process.env.PORT || 3030;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

var emailpw = require(path.join(__dirname + '/emailpw.js'));

// var emailpw = require("./emailpw.js");


var transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		auth: {
				// user: process.env.GMAIL_USERNAME || emailpw.user,
				// pass: process.env.GMAIL_PW || emailpw.pass
				user: process.env.GMAIL_USERNAME,
				pass: process.env.GMAIL_PW
		}
});
//html page routing
app.get('/', function(req, res) {
	  res.sendFile(path.join(__dirname + '/index.html'));
	});
//mailer routing
app.get('/sendemail', function(req, res){
	// console.log(req);
	var mailOptions={
	 from: req.query.from,
   to : req.query.to,
   subject : req.query.subject,
   text : req.query.text
}
	// console.log(mailOptions);
	transporter.sendMail(mailOptions, function(error, response){
		if(error){
			console.log(error);
			res.end("error");
		} else {
		// console.log("Message sent: " + response.message);
		res.end("sent");
		}
	});
});



app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
