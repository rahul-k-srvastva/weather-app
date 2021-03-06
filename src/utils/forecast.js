const request = require('request');

const forecast = (lon, lat, requestData, callback) => {
	const options = {
		method: 'GET',
		url: 'https://api.climacell.co/v3/weather/realtime',
		qs: {
			lat,
			lon,
			unit_system: 'si',
			fields: requestData.join(),
			apikey: 'aEi2VpQYkJmaLb9rwVNS0EIUEmkG52HE'
		},
		json: true
	};

	request(options, (error, { body } = {}) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.errorCode) {
			callback('Unable to find location!', undefined);
		} else {
			callback(
				undefined,
				`The weather is ${body.weather_code.value}. It is currently ${body.temp
					.value} degrees out. There is currently ${body.precipitation
					.value} precipitation.\nOther details about weather:\nFeels like: ${body.feels_like
					.value}\nHumidity: ${body.humidity.value}\nWind Speed: ${body.wind_speed
					.value}\nWind Direction: ${body.wind_direction.value}\nVisibility: ${body.visibility
					.value}\nSunrise at: ${body.sunrise.value}\nSunset at: ${body.sunset.value}`
			);
		}
	});
};

module.exports = forecast;
