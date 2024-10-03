//Fetch weather information from given coordinates
// wrong function realises after i made it :(
/*
WeatherContainer = document.getElementById('Weather-container');
async function fetchWeather() {
    let latitudeinput = document.getElementById('latitude-input').value;
    let longitudeinput = document.getElementById('longitude-input').value;
    const API = ` https://api.open-meteo.com/v1/forecast?latitude=${latitudeinput}&longitude=${longitudeinput}&current_weather=true`;
    const json = await fetch(API)
    .then((response) => response.json())
    .then(data => {
        const currentWeather = data.current_weather;
        WeatherContainer.innerHTML =  `
                <div class="weatherBox">
                    <h2>Daily Weather</h2>
                    <p>Temperature: ${currentWeather.temperature} °C</p>
                    <p>Wind Speed: ${currentWeather.windspeed} m/s</p>
                </div>
            `;
        })
    .catch(() => {
        alert('Failed to fetch the coordinates! Please try again');
    });
}
*/

// changed to fetch the daily instead and decided to keep it :)
const WeatherContainer = document.getElementById('Weather-container');
async function fetchWeather() {
    let latitudeinput = document.getElementById('latitude-input').value.trim();
    let longitudeinput = document.getElementById('longitude-input').value.trim();
    const API = `https://api.open-meteo.com/v1/forecast?latitude=${latitudeinput}&longitude=${longitudeinput}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=auto`;

    const json = await fetch(API)
    .then((response) => response.json())
    .then(data => {   
        const dailyWeather = data.daily;
        WeatherContainer.innerHTML = '';
        WeatherContainer.innerHTML += `
            <div class="weatherBox">
                <h2 class = "WCtitle">Today's Weather</h2>
                <p>Date: ${dailyWeather.time[0]}</p>
                <p>Max Temperature: ${dailyWeather.temperature_2m_max[0]} °C</p>
                <p>Min Temperature: ${dailyWeather.temperature_2m_min[0]} °C</p>
                <p>Max Wind Speed: ${dailyWeather.windspeed_10m_max[0]} m/s</p>
            </div>
        `;
    })
    .catch(() => {
        alert('Failed to fetch the coordinates! Please try again');
    });
}



// Get the data from Open-Meteo for the required 5 calls
const Locations = [
    {name: "Gjøvik", Latitude: 60.7957,  Longitude: 10.6915},
    {name: "Drammen", Latitude: 59.7439,  Longitude: 10.2045},
    {name: "Beijing", Latitude: 39.9075,  Longitude: 116.3972},
    {name: "Sydney", Latitude: -33.8678,  Longitude: 151.2073},
    {name: "Ankara", Latitude: 39.9199,  Longitude: 32.8543}
];

/* ?? confusing that implementing the for loop threw out the ability to use .then
async function fetchMulti() {
    const WeatherMC = document.getElementById('Weather-MultiContainer');
    WeatherMC.innerHTML = ''; //clear data 
    for (const location of Locations) {
        const API2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.Latitude}&longitude=${location.Longitude}&current_weather=true`);
        const getLoc = await fetch(API2)
        .then((getLoc) => getLoc.json())
        .then(data => {
            
            WeatherMC.innerHTML +=  
            <div class="weatherBox2">
                <h2>${location.name}</h2>
                <p>Temperature: ${data.current_weather.temperature}°C</p>
                <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
                <p>Latitude: ${location.Latitude}</p>
                <p>Longitude: ${location.Longitude}</p>
            </div>
        ;
        
        })
        .catch(() => {
            alert('Failed to fetch the coordinates! Please try again');
        });
    }
}
*/


async function fetchMulti() {
    const WeatherMC = document.getElementById('Weather-MultiContainer');
    WeatherMC.innerHTML = `<h1 class="LOCtitle">World Weather Conditions </h1>`;
    for (const location of Locations) { //calls from the Locations array
        try { 
        //change name so it doesnt conflict with the function above
        const getLoc = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.Latitude}&longitude=${location.Longitude}&current_weather=true`);
        const data = await getLoc.json(); 
        // should apphend new data inside 
        WeatherMC.innerHTML += ` 
                <div class="weatherBox2">
                    <h2>${location.name}</h2>
                    <p>Temperature: ${data.current_weather.temperature}°C</p>
                    <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
                    <p>Latitude: ${location.Latitude}</p>
                    <p>Longitude: ${location.Longitude}</p>
                </div>
            `;
        } catch (error) {
            alert('Failed to fetch ' + location.name);
        }
    }
}

//updates the displayed data at regular intervals to ensure it remains current
function updateWeather() {
    fetchMulti(); //the function we want to update :)
  }
// updates every 10 minutes
  setInterval(updateWeather, 1000 * 60 * 10);
  
  // initial calling to display our Locations
  updateWeather();