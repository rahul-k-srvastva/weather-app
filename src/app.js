const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Rahul Srivastava'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me: ',
		name: 'Rahul Srivastava'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, at corrupti modi mollitia qui numquam accusamus neque sunt vitae sapiente. Hic similique aperiam praesentium. Dicta quaerat, pariatur consectetur eveniet a alias vel cum sed esse optio, iure sequi nesciunt odit aliquid sapiente ex quasi incidunt dolorem eum excepturi nam. Corporis est amet maiores quia qui, ad saepe nobis enim temporibus distinctio voluptate ipsa quas expedita placeat nostrum ratione, commodi nemo hic quaerat veritatis. Sequi nesciunt consectetur cumque suscipit aliquid deleniti facilis explicabo dicta repellat molestiae dolore minima sapiente similique natus odio eius neque, numquam aspernatur tenetur esse. Laborum, saepe sed.',
		name: 'Rahul Srivastava'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Address not provided for weather checking.'
		});
	}

	geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		foreCast(
			longitude,
			latitude,
			[
				'weather_code',
				'temp',
				'precipitation',
				'feels_like',
				'humidity',
				'wind_speed',
				'wind_direction',
				'visibility',
				'sunrise',
				'sunset'
			],
			(error, forecastData) => {
				if (error) {
					return res.send({ error });
				}
				res.send({ address: req.query.address, location, forecastData });
			}
		);
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMsg: 'Help article not found',
		name: 'Rahul Srivastava'
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMsg: 'Page not found',
		name: 'Rahul Srivastava'
	});
});

app.listen(port, () => {
	console.log(`Listening at port ${port}`);
});
