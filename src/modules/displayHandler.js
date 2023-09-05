import apiHandler from "./apiHandler.js";

const displayHandler = (() => {
  const locationForm = document.querySelector("#location-form");
  const locationInput = document.querySelector("#location-input");

  const bindEvents = () => {
    locationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleInputSubmit();
    });
  };

  const handleInputSubmit = () => {
    apiHandler.fetchWeather(locationInput.value);
  };

  bindEvents();
})();
