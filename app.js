const express =  require('express');  //class
const app = express();                //object
const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');    
});

app.post('/', function(req, res){
    console.log('Request had been received.');
    
    const query = req.body.cityName;
    const apiKey = '74838be9a1a97f3ba9f903c58cab0dd4';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey;
       https.get(url, function(response){
           console.log(response.statusCode);
    
           response.on('data', function(data){
               const weatherInfo = JSON.parse(data);
               const temp = Math.trunc(weatherInfo.main.temp - 273); 
               const dct = weatherInfo.weather[0].description;
               const icon = weatherInfo.weather[0].icon;
               const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
               console.log(query);
               console.log(temp);
               console.log(dct); 
               res.write("<h1>" +query + "'s temperature is "  + temp + " degree Celsius. </h1>");
               res.write("<h1> Today we have a " + dct + ".</h1><img src=" + iconURL +"></img>");
               res.send();    
           });
       }); 
});



app.listen('3000', function(){
    console.log('Server is running on port 3000');
});


