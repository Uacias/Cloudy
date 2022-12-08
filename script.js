`use strict`;

document.addEventListener("DOMContentLoaded", function () {
  const key = `00821c5560d7c6b071e1600e771eff98`;
  const button = document.querySelector(`.button`);
  const input = document.querySelector(`.input`);
  const body = document.querySelector(`body`);
  const imgToggle = document.querySelector(`.img_toggle_bg`);
  let isImage = false;
  let currentCity = `London`;

  const setupBackground = (logic) => {
    if (logic) {
      imgToggle.src = `./img/img_bg_custom.png`;
      body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${currentCity}), url(./img/img_bg_tmp.jpg)`;
      body.style.backgroundPosition = `center`;
      body.style.backgroundRepeat = `no-repeat`;
      body.style.backgroundSize = `cover`;
      return;
    }
    body.style.backgroundImage = ``;
    imgToggle.src = `./img/img_bg_city.png`;
  };

  imgToggle.addEventListener(`click`, () => {
    if (!isImage) {
      isImage = true;
    } else {
      isImage = false;
    }
    setupBackground(isImage);
  });

  const fetchWeatherData = (city) => {
    const data = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    )
      .then((response) => response.json())
      .then((data) => displayData(data));
  };

  const displayData = (data) => {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp, humidity, pressure } = data.main;
    const { speed } = data.wind;

    document.querySelector(`.span-city`).textContent = name;
    document.querySelector(`.span-temperature`).textContent = `${parseFloat(
      temp - 273.15
    ).toFixed(1)}°C`;
    document.querySelector(`.span-description`).textContent = description;
    document.querySelector(`.span-pressure`).textContent = `${pressure}hPa`;
    document.querySelector(`.span-humidity`).textContent = `${humidity}%`;
    document.querySelector(`.span-wind`).textContent = `${speed}m/s`;
  };

  button.addEventListener(`click`, (e) => {
    e.preventDefault();
    fetchWeatherData(input.value);
    currentCity = input.value;
    input.placeholder = input.value;
    input.value = ``;
    setupBackground(isImage);
  });
});
