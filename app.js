const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
	const query = req.body.cityName;
	const apiKey = '6b5e036413e66f93f1d28f784c8427ed';
	const unit = 'metric';
	const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;
	https.get(url, function(response) {
		console.log(response.statusCode);

		response.on('data', function(data) {
			const wetherData = JSON.parse(data);
			const temp = wetherData.main.temp;
			const wetherDescripton = wetherData.weather[0].description;
			const icon = wetherData.weather[0].icon;
			const imageURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
			res.write('<p>The wether is currently ' + wetherDescripton + ' </p>');
			res.write('<h1>The temperature in ' + query + ' is ' + temp + ' degrees! </h1>');
			res.write('<img src=' + imageURL + '>');
			res.send;
		});
	});
});

app.listen(3000, function() {
	console.log('server running 3000');
});
