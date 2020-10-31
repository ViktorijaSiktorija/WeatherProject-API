const express = require ("express");
const https = require('https');
const bodyParser = require('body-parser')



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");

  });

app.post("/", (req,res) => {
  const query = req.body.cityName;
  const apiKey = "a842be749656274a0416fdf4fe119a83";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, (response)=>{
    console.log(response.statusCode);

    response.on('data', (data) => {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    res.write("<p>Vreme je trenutno " + description + "<p>");
    res.write("<h1>Temperatura u " + query + " je " + temp + " stepena");
    res.write("<img src=" + imageURL +">");


      res.send()

    });
  });
});




app.listen(3000, () => {
  console.log("port on 3000");
});
