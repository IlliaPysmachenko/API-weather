const param = {
   "url": "https://api.openweathermap.org/data/2.5/",
   "appid": "dc082e19e7ae1d3be38ae94c133234d6"
}

function getWeather() {
   const cityId = document.querySelector('#city').value;
   fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
      .then(weather => { return weather.json(); })
      .then(showWeather);
}
getWeather();
document.querySelector('#city').onchange = getWeather;

function showWeather(data) {
   console.log(data);
   document.querySelector('.out_city').innerHTML = data.name;
   document.querySelector('.out_temp').innerHTML = Math.round(data.main.temp) + '&deg;';
   document.querySelector('.out_sky').innerHTML = data.weather[0]['description'];
   document.querySelector('.out_icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
}


