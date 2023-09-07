import apiHandler from "./apiHandler.js";
import utilities from "./utilities.js";

const displayHandler = (() => {
  const body = document.querySelector("body");
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
    const localTime = document.querySelector(".local-time");
    cityEl.textContent = locationObj.name;
    regionEl.textContent = locationObj.region;
    countryEl.textContent = locationObj.country;
    localTime.textContent = locationObj.localtime.slice(-5);
  };

  const displayIcon = (code) => {
    const currentImgDiv = document.querySelector("#current-img-div");
    currentImgDiv.innerHTML = utilities.getIconSVG(code);
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

  const displayWindSpeed = (speed) => {
    const windSpeed = document.querySelector(".wind-speed");
    windSpeed.textContent = speed + "mph";
  };

  const displayGustSpeed = (speed) => {
    const gustSpeed = document.querySelector(".gust-speed");
    gustSpeed.textContent = speed + "mph";
  };

  const displayWindDirection = (dir) => {
    const direction = document.querySelector(".wind-direction");
    direction.textContent = dir;
  };

  const displaySunriseTime = (time) => {
    const sunrise = document.querySelector(".sunrise");
    sunrise.textContent = time;
  };

  const displaySunsetTime = (time) => {
    const sunset = document.querySelector(".sunset");
    sunset.textContent = time;
  };

  const displayMoonPhase = (phase) => {
    const moonPhase = document.querySelector(".moon-phase");
    moonPhase.textContent = phase;
  };

  const displayVisibility = (val) => {
    const vis = document.querySelector(".visibility");
    vis.textContent = val + "mi";
  };

  const displayHumidity = (val) => {
    const humidity = document.querySelector(".humidity");
    humidity.textContent = val + "%";
  };

  const displayUV = (val) => {
    const uv = document.querySelector(".uv-level");
    uv.textContent = val;
  };

  const displayHourly = (hours) => {
    dayReel.innerHTML = "";
    dayReel.style.right = "0px";
    hours.forEach((hour) => {
      const hourDiv = utilities.getHourEl(hour);
      dayReel.append(hourDiv);
    });
  };

  const dimOnLoad = () => {
    body.style.opacity = "0.4";
  };

  const undimOnLoaded = () => {
    body.style.opacity = "1";
  };

  const displayCurrent = () => {
    dimOnLoad();

    const currentWeatherObj = apiHandler.getForecast();
    displayLocation(currentWeatherObj.location);
    displayIcon(currentWeatherObj.current.condition.code);
    displayCurrentCondition(currentWeatherObj.current.condition.text);
    displayCurrentTemp(currentWeatherObj.current.temp_c);
    displayCurrentFeelsLike(currentWeatherObj.current.feelslike_c);
    displayCurrentPrecip(currentWeatherObj.current.precip_mm);

    displayWindSpeed(currentWeatherObj.current.wind_mph);
    displayGustSpeed(currentWeatherObj.current.gust_mph);
    displayWindDirection(currentWeatherObj.current.wind_dir);

    displaySunriseTime(currentWeatherObj.forecast.forecastday[0].astro.sunrise);
    displaySunsetTime(currentWeatherObj.forecast.forecastday[0].astro.sunset);
    displayMoonPhase(
      currentWeatherObj.forecast.forecastday[0].astro.moon_phase
    );

    displayVisibility(currentWeatherObj.current.vis_miles);
    displayHumidity(currentWeatherObj.current.humidity);
    displayUV(currentWeatherObj.current.uv);

    displayHourly(currentWeatherObj.forecast.forecastday[0].hour);

    undimOnLoaded();
  };

  const updateWeather = async (location) => {
    await apiHandler.fetchWeather(location);
    displayCurrent();
  };

  bindEvents();
  updateWeather();
})();
