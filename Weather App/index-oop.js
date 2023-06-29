let weather = {
  apiKey: "59aee0e7f4dde9271ce1af6a444c4dad",
  //   url: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}`,
  // create a document.querySelector to improve legibility
  // shorten the fetch call

  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}
      &appid=${this.apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    // refactor to have only one innerHTML return for deconstructed properties
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
      //   refactor src to a short variable with the api img
    ).src = `http://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = `${description}`;
    document.querySelector(".temp").innerText = `${Math.floor(temp)} °C`;

    document.querySelector(".humidity").innerText = `Humidity ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind speed ${Number(
      speed
    ).toFixed(1)} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    // backgroud color functionality
    document.body.style.background = "";

    //
    // background color functionality
    // let dogUrl = url('https://dog.ceo/api/breeds/image/random')
    document.body.style.backgroundImage = "";
    // document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`
  },
  search: function () {
    let input = document.querySelector(".search-bar").value;
    // input is not needed
    if (input == "") {
      alert("Please type a city");
    } else {
      this.fetchWeather(input);
    }
  },
  backgroundColorFunc: function (perc) {
    let r,
      g,
      b = 0;
    if (perc < 50) {
      r = 255;
      g = Math.round(5.1 * perc);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * perc);
    }
    let h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  },
  tempColor: function (temp) {
    if (temp <= 10) {
      perc = "#0000FF";
    }
    if (temp > 10 || temp >= 23) {
      perc = 75;
    }
    if (temp > 23 || temp < 30) {
      perc = 18;
    }
    if (temp > 30) {
      perc = 1;
    }
  },
};
const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", function () {
  activate();
});

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  // console.log('enter')
  if (e.key == "Enter") {
    activate();
  }
});

const activate = function () {
  weather.search();
  document.querySelector(".search-bar").value = "";

  //   document.body.style.background = weather.tempColor(30);
  //   console.log(weather.tempColor(30))
};

// weather.fetchWeather("Berlin");

// perc = 1;

// perc = 1;

// document.body.style.background = "#0000FF";


