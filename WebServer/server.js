const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {

	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {

		if (err) {
			console.log("unable to append to server.log ")
		}

	})

	next();

}); //app.use() is used for middleware


// app.use((req, res, next) => {

// 	res.render('maintenance.hbs');    //this middleware will not let the rest of exectute. NOTE: whatever is on top will execute

// }); 

app.use(express.static(__dirname + '/public')); //you can see this at localhost:3000/help.html



// ---------------- helper functions for partials in hbs -------------

hbs.registerHelper('getCurrentYear', () => {

	return new Date().getFullYear();

});

hbs.registerHelper('screamIt', (text) => {

	return text.toUpperCase();

});


app.get('/', (req,res) => {           //http request and response

	res.render('home.hbs', {
		pageTitle : 'New Home Page',
		WelcomeMsg: 'Welcome to my website'
	});

});


app.get('/about', (req,res) => {

	res.render('about.hbs', {
		pageTitle : 'About Page',          //these are the parameters you are sending to about.hbs
	});                                   //hbs automatically looks under views directory by default

});


app.get('/bad', (req,res) => {

	res.send({
		errorMessage : 'Unable to handle request'
	});

});

app.listen(port, () => { //second argument is for printing the message to screen
	console.log(`server is up on port ${port}`);
});