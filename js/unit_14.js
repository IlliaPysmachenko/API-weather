const param = {
   "url": "https://api.openweathermap.org/data/2.5/",
   "appid": "dc082e19e7ae1d3be38ae94c133234d6"
}
const cities = {
   2643743: 'London',
   625144: 'Minsk',
   709930: 'Dnipro',
   703448: 'Kyiv'
}

function getWeather() {
   const cityId = document.querySelector('#city').value;
   fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
      .then(weather => { return weather.json(); })
      .then(showWeather);
}
createElem();
getWeather();
document.querySelector('#city').onchange = getWeather;

function showWeather(data) {
   console.log(data);
   document.querySelector('.out__city').innerHTML = data.name;
   document.querySelector('.out__temp').innerHTML = Math.round(data.main.temp) + '&deg;';
   document.querySelector('.out__sky').innerHTML = data.weather[0]['description'];
   document.querySelector('.out__icon').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
   document.querySelector('.out__wind').innerHTML = `${data.wind['speed']} m/s ${windDirection(data.wind.deg)}`;
   document.querySelector('.out__humidity').innerHTML = `Humidity: ${data.main.humidity}%`;
   document.querySelector('.out__pressure').innerHTML = `${data.main.pressure}hPA`;
}


function windDirection(d) {
   const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'Nw'];

   d += 22.5;

   if (d < 0)
      d = 360 - Math.abs(d) % 360;
   else
      d = d % 360;

   let w = parseInt(d / 45);
   return `${directions[w]}`;
}


function createElem() {
   let select = document.createElement('select');
   select.setAttribute("id", 'city');
   document.querySelector('.weather').prepend(select);

   for (let key in cities) {
      let option = document.createElement('option');
      option.innerHTML = cities[key];
      option.value = key;
      document.querySelector('#city').appendChild(option);
   }

}

