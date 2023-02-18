let weather = {
    apiKey: "2729d54c5a7e239bdc57c4edf0d1299f",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp,feels_like,humidity } = data.main;
      const { all } = data.clouds;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".feels_like").innerText = "Feels_Like: "+ feels_like + "°C";
      document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
    
      document.querySelector(".clouds").innerText ="Cloud Cover: "+ all + "%";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?clouds-raindrops-sunclouds" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Pune");
