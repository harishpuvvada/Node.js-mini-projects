const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');

// ---------------- command configuration ----------------

const argv = yargs
	.options({
		a: {
			demand:true,
			alias: 'address',
			describe:'Address to fetch weather for ',
			string: true //telling yargs to parse user input as string
		}

	})
	.help()
	.alias('help','h')
	.argv;

// -------------- End of Command Configuration ----------------

//console.log(argv);



var encodedAddress = encodeURIComponent(argv.address);


//request => 1st arg = options, 2nd arg = callback function
request({

	url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
	json : true

},(error, response, body)=>{
	if (error){						//error => this is when "node" cannot even make a request, eg: invalid url
		console.log('Unable to connect to google service');
	} 
	else if (body.status === 'ZERO_RESULTS'){
		console.log('Unable to find that address');
	}
	else if (body.status === 'OK'){
	console.log(`Address : ${body.results[0].formatted_address}`);
	console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
	console.log(`Longitude : ${body.results[0].geometry.location.lng}`);
	}

});