const apiKey = "59aee0e7f4dde9271ce1af6a444c4dad";

const fetchWeather = async (city) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}
        &appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == 404) {
        // in case of 404 error
        document.querySelector(".notification").classList.remove("hidden");
      } else {
        displayWeather(data);
      }
    });
};

const displayWeather = (data) => {
  document.querySelector(".weather").classList.remove("hidden");
  document.querySelector(".notification").classList.add("hidden");
  const { name, timezone, cod } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  document.querySelector(".city").innerText = `Weather in ${name}`;
  document.querySelector(
    ".icon"
  ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  document.querySelector(".description").innerText = `${description}`;
  document.querySelector(".temp").innerText = `${Math.floor(temp)} °C`;

  document.querySelector(".humidity").innerText = `Humidity ${humidity}%`;
  document.querySelector(".wind").innerText = `Wind speed ${Number(
    speed
  ).toFixed(1)} km/h`;

  // COLOR ---------------
  const tempColor = function () {
    const card = document.querySelector(".card");
    const tempNumber = document.querySelector(".tempNumber");
    if (temp <= 10) {
      card.style.background = "blue";
      tempNumber.style.color = "blue";
    } else if (temp > 10 && temp <= 23) {
      card.style.background = "green";
      tempNumber.style.color = "green";
    } else if (temp > 23 && temp < 30) {
      card.style.background = "rgba(245, 255, 51, 0.59)";
      tempNumber.style.color = "rgba(245, 255, 51, 0.59)";
    } else if (temp >= 30) {
      card.style.background = "red";
      tempNumber.style.color = "red";
    }
  };
  tempColor(temp);
};
const search = function () {
  let searchInput = document.querySelector(".search-bar").value;

  if (searchInput == "") {
    document.querySelector(".notification").classList.remove("hidden");
    document.querySelector(".note").innerText = "Please type a location";
  } else {
    fetchWeather(searchInput);
    document.querySelector(".note").innerText = "No location found";
    document.querySelector(".notification").classList.add("hidden");
  }
};

const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", function () {
  activate();
});

document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    activate();
  }
});

const activate = function () {
  search();
  document.querySelector(".search-bar").value = "";
};
// called on loading
fetchWeather("berlin");
