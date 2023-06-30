const apiKey = "59aee0e7f4dde9271ce1af6a444c4dad";
//   url: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}`,
// create a document.querySelector to improve legibility
// shorten the fetch call

const fetchWeather = async function (city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}
      &appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => displayWeather(data));
};
const displayWeather = function (data) {
  // refactor to have only one innerHTML return for deconstructed properties
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  // console.log(name, icon, description, temp, humidity, speed);
  console.log(name, temp);

  document.querySelector(".city").innerText = `Weather in ${name}`;
  document.querySelector(
    ".icon"
    //   refactor src to a short variable with the api img
  ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  document.querySelector(".description").innerText = `${description}`;
  document.querySelector(".temp").innerText = `${Math.floor(temp)} °C`;

  document.querySelector(".humidity").innerText = `Humidity ${humidity}%`;
  document.querySelector(".wind").innerText = `Wind speed ${Number(
    speed
  ).toFixed(1)} km/h`;
  document.querySelector(".weather").classList.remove("loading");

  // backgroud color functionality
  // card.style.background = "rgba(64, 160, 152, 0.36)";
  const tempColor = function () {
    const card = document.querySelector(".card");
    const tempNumber = document.querySelector(".tempNumber");
    if (temp <= 10) {
      card.style.background = "blue";
      tempNumber.style.color = "blue";
    }
    if (temp > 10 && temp <= 23) {
      card.style.background = "green";
      tempNumber.style.color = "green";
    }
    if (temp > 23 && temp < 30) {
      card.style.background = "yellow";
      tempNumber.style.color = "yellow";
    }
    if (temp >= 30) {
      card.style.background = "red";
      tempNumber.style.color = "red";
    }
    console.log(temp);
  };
  tempColor(temp);

  // let perc = 1;
  // let backgroundColorFunc = function (perc) {
  //   let r,
  //     g,
  //     b = 0;
  //   if (perc < 50) {
  //     r = 255;
  //     g = Math.round(5.1 * perc);
  //   } else {
  //     g = 255;
  //     r = Math.round(510 - 5.1 * perc);
  //   }
  //   let h = r * 0x10000 + g * 0x100 + b * 0x1;
  //   return "#" + ("000000" + h.toString(16)).slice(-6);
  // };
  // let tempColor = function (temp) {
  //   if (temp < 10) {
  //     perc = "#0000FF";
  //   }
  //   if (temp > 10 || temp >= 23) {
  //     perc = 75;
  //   }
  //   if (temp > 23 || temp < 30) {
  //     perc = 18;
  //   }
  //   if (temp > 30) {
  //     perc = 1;
  //   }
  //   return perc

  // };
  // console.log(tempColor)

  // document.body.style.background = backgroundColorFunc(temp);
  // console.log(backgroundColorFunc())

  // document.body.style.backgroundImage = "";
};
const search = function () {
  let input = document.querySelector(".search-bar").value;
  // input is not needed
  if (input == "") {
    alert("Please type a city");
  } else {
    fetchWeather(input);
  }
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
  search();
  document.querySelector(".search-bar").value = "";

  //   document.body.style.background = weather.tempColor(30);
  //   console.log(weather.tempColor(30))
};
fetchWeather("berlin");
