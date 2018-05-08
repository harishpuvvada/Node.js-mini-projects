const request = require('request');

var geocodeAddress = (address,callback) => {

  var encodedAddress = encodeURIComponent(address);

  //request => 1st arg = options, 2nd arg = callback function
  request({

  	url : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
  	json : true

  },(error, response, body)=>{
  	if (error){						//error => this is when "node" cannot even make a request, eg: invalid url
  		callback('Unable to connect to google service');
  	}
  	else if (body.status === 'ZERO_RESULTS'){
  		callback('Unable to find that address');
  	}
  	else if (body.status === 'OK'){
      callback(undefined, {

        Address : body.results[0].formatted_address,
        Latitude : body.results[0].geometry.location.lat,
        Longitude : body.results[0].geometry.location.lng

      });
  	}
  });
};


module.exports.geocodeAddress = geocodeAddress;
