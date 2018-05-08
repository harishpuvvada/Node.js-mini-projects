const request = require('request');

var getWeather = (lat,long,callback) => {

request({
	url : `https://api.darksky.net/forecast/1229d3bb19b634fc84fd7d273c66c606/${lat},${long}`,
	json : true
}, (error, response, body) => {
	if(!error && response.statusCode === 200){
		callback(undefined,{                   //In this case first argument is undefined because there is no error message
			temperature : body.currently.temperature,
			appTemperature : body.currently.apparentTemperature
		});

	} else {
		callback("Unable to fetch weather");  //this is error message (for if statement this is undefined)
	}
});


};


module.exports.getWeather = getWeather;

// : 1229d3bb19b634fc84fd7d273c66c606