import apiHandler from "./apiHandler.js";

const displayHandler = (() => {
  const locationForm = document.querySelector("#location-form");
  const locationInput = document.querySelector("#location-input");
  const nextHourly = document.querySelector(".hourly-right");
  const lastHourly = document.querySelector(".hourly-left");
  const dayReel = document.querySelector("#day-reel");
  let hourForecastPos = 0;

  const bindEvents = () => {
    locationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      updateWeather(locationInput.value);
    });
    nextHourly.addEventListener("click", () => scrollHourForecastForwards());
    lastHourly.addEventListener("click", () => scrollHourForecastBackwards());
  };

  const scrollHourForecastForwards = () => {
    if (hourForecastPos == 2720) return;
    hourForecastPos += 1360;
    dayReel.style.right = hourForecastPos + "px";
  };

  const scrollHourForecastBackwards = () => {
    if (hourForecastPos == 0) return;
    hourForecastPos -= 1360;
    dayReel.style.right = hourForecastPos + "px";
  };

  const displayLocation = (locationObj) => {
    const cityEl = document.querySelector(".city");
    const regionEl = document.querySelector(".region");
    const countryEl = document.querySelector(".country");
    cityEl.textContent = locationObj.name;
    regionEl.textContent = locationObj.region;
    countryEl.textContent = locationObj.country;
  };

  const displayCurrentCondition = (condition) => {
    const currentCondition = document.querySelector(".current-condition");
    currentCondition.textContent = condition;
  };

  const displayCurrentTemp = (temp) => {
    const currentTemp = document.querySelector(".current-temp");
    currentTemp.textContent = temp;
  };

  const displayCurrentFeelsLike = (temp) => {
    const currentFeelsLike = document.querySelector(".current-feels-like");
    currentFeelsLike.textContent = temp;
  };

  const displayCurrentPrecip = (precip) => {
    const currentPrecip = document.querySelector(".current-precip");
    currentPrecip.textContent = precip;
  };

  const displayCurrent = () => {
    const currentWeatherObj = apiHandler.getForecast();
    displayLocation(currentWeatherObj.location);
    displayCurrentCondition(currentWeatherObj.current.condition.text);
    displayCurrentTemp(currentWeatherObj.current.temp_c);
    displayCurrentFeelsLike(currentWeatherObj.current.feelslike_c);
    displayCurrentPrecip(currentWeatherObj.current.precip_mm);
  };

  const updateWeather = async (location) => {
    await apiHandler.fetchWeather(location);
    displayCurrent();
  };

  bindEvents();
  updateWeather();
})();
