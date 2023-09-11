const apiHandler = (() => {
  const weatherApiUrlCurrent = "https://api.weatherapi.com/v1/current.json";
  const weatherApiUrlForecast = "https://api.weatherapi.com/v1/forecast.json";
  const apiKey = "5b67dd39869a4d9b8be85347230109";

  let forecastWeatherObj = null;

  const fetchWeather = async (location = "London") => {
    const url = `${weatherApiUrlForecast}?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`;
    const response = await fetch(url, { mode: "cors" });
    const weatherData = await response.json();
    if (weatherData.error)
      console.log("Fetch error: ", weatherData.error.message);
    forecastWeatherObj = weatherData;
  };

  const getForecast = () => forecastWeatherObj;

  return {
    fetchWeather,
    getForecast,
  };
})();

export default apiHandler;
