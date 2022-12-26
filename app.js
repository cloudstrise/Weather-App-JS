window.addEventListener('load', ()=> {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let apiKey = '1bf954ba4fd9d3465c6db8d253ae5042';

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;               

            fetch(api)
                .then(response => {
                    return response.json();
                })

                .then(data => {
                  console.log(data);
                  const { name } = data;
                  const { temp } = data.main;
                  const { description } = data.weather[0];
                  const { icon } = data.weather[0];

                  //Set DOM Elements from API
                  temperatureDegree.textContent = temp;
                  temperatureDescription.textContent = description;
                  locationTimezone.textContent = name;

                  //Celcius Formula
                  let farenheit = (temp * 1.8) + 32;

                  //Set Icon
                  locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

                  console.log(temp, description, icon);

                  //Change temperature to / from Celsius/Farenheit
                  temperatureSection.addEventListener("click", () => {
                    if (temperatureSpan.textContent == "C") {
                      temperatureSpan.textContent = "F";
                      temperatureDegree.textContent = Math.floor(farenheit);
                    } else {
                      temperatureSpan.textContent = "C";
                      temperatureDegree.textContent = temp;
                    }
                  });

                })
        });
    }


});