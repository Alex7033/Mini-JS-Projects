const key = "59aee0e7f4dde9271ce1af6a444c4dad";
const forest = "./forest.jpg";

let loc = document.querySelector("#search");
const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc.value}&appid=${key}`;
const btn = document.querySelector(".btn");
const img = document.querySelector("#img");
const imgContainer = document.querySelector(".imgContainer");

const request = async function () {
  const response = await fetch(url);
  const jsonData = await response.json();
  console.log(jsonData);
};

// console.log(request());

btn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(request())

  
  console.log(loc.value);
  // imgContainer.innerHTML = `<img src=${forest} alt="" srcset="" id="img" />`;
});
