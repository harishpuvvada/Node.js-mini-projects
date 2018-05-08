const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, georesults) => {

	if (errorMessage){

		console.log(errorMessage);

	} else{
			
			console.log(georesults.Address);

			weather.getWeather( georesults.Latitude, georesults.Longitude , (errorMessage, weatherResults) => {

			if (errorMessage){
				console.log(errorMessage);                    // weather function call is put inside the geocode functional call
			} else{
				console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.appTemperature}.`);
			}

		});

	}

});




