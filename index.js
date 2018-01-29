const request = require('request');
const apiKey = 'e2f172b7b024560a027f6024da6acffc';

app.post('/', function (req,res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {weather: null, error: 'Error, please try again'});
        }
        else {
            let weather = JSON.parse(body);
            if(undefined === weather.main) {
                res.render('index', {weather: null, error: 'Error, please try again'});
            }
            else {
                let weatherResponse = `It's ${weather.main.temp} Celsius in ${weather.name}!`;
                res.render('index', {weather: weatherResponse, error: null});
            }
        }
    });
});