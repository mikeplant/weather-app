const apiHandler = (() => {
  const weatherApiUrlCurrent = "https://api.weatherapi.com/v1/current.json";
  const weatherApiUrlForecast = "https://api.weatherapi.com/v1/forecast.json";
  const apiKey = "5b67dd39869a4d9b8be85347230109";

  let currentWeatherObj = null;
  let forecastWeatherObj = null;

  const fetchCurrent = async (location) => {
    try {
      const url = `${weatherApiUrlCurrent}?key=${apiKey}&q=${location}&aqi=no`;
      const response = await fetch(url, { mode: "cors" });
      const weatherData = await response.json();
      currentWeatherObj = weatherData.current;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchForecast = async (location) => {
    try {
      const url = `${weatherApiUrlForecast}?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`;
      const response = await fetch(url, { mode: "cors" });
      const weatherData = await response.json();
      forecastWeatherObj = weatherData.forecast;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeather = async (givenLocation = "London") => {
    let location = givenLocation;
    await fetchCurrent(location);
    await fetchForecast(location);
    console.log({ currentWeatherObj, forecastWeatherObj });
  };

  return {
    fetchWeather,
  };
})();

export default apiHandler;
