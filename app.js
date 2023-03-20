const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  const query = req.body.cityName;
  const apiKey = 'efc1f477f6d56b2f3e74841c8107b54c';
  const unit = 'metric';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    apiKey +
    '&units=' +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';
      res.write(
        '<h1>The Temperature in ' +
          query +
          ' is ' +
          temp +
          ' Desgrees Celsius</h1>'
      );
      res.write('<p>The weather is ' + desc + '</p>');
      res.write('<img src=' + imageURL + '>');
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log('Server started at port 3000');
});
