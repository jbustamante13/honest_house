var express=require("express");
var bodyParser=require('body-parser');
 
var conn = require('./config');
var app = express();
app.use(express.static("honesthouse-patch-5"));

app.use(bodyParser.urlencoded({ extended: true }));
// app.use("images", express.static(__dirname + "/public/images"));
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
   res.redirect('/index.html') 
})

app.get('*', function(req, res){
	res.redirect('/index.html')
})
 
app.get('index.html', function(req, res){
	res.sendFile("index.html");
})

app.get('contact.html', function (req, res) {  
   res.sendFile( "contact.html" );  
})  

app.get('donate.html', function(req, res){
	res.sendFile("donate.html");
})
app.get('about.html', function(req, res){
	res.sendFile("about.html");
})

app.post('contact.html', function(req, res){
	conn.query("INSERT INTO contact VALUES (?, ?, ?, ?);", [req.body.fname, req.body.lname, req.body.email, req.body.message], function(error, results, fields){
		if(error){
			console.log(error);
			res.json({
				success: false
			});
		} else {
			res.json({
				success: true
			})
		}
	});

});

app.post('/login', function(req, res){
	conn.query("SELECT * FROM users WHERE email=?", req.body.email, function(error, results, fields){
		var body = req.body;
		var success = null;
		var message = "";
		if(error){
			success = false;
			message = "Unknown error occured"
		} else {

			/*
			You will receive the output of the query in the variable results as an array.
			You also have the data from the form in the varible body. Make sure you console.log() to understand the format.
			TODO:
			1. Make sure the results array has length greater than 0.
			2. If the length is greater than 0, check for the username received in the request.
			3. If the username is correct, check for the password received in the request.
			4. If everything checks out, assign success as TRUE and message as "Success".
			5. If it fails the check at any point, assign success as FALSE and message as the reason it failed. 
				e.g: "Username does not match", "Email ID does not exist", etc.  
			*/

		}
	res.json({
				success: success,
				message: message
			});
	})

})


app.listen(3000);