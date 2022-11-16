import axios from "axios";
const API_KEY = "Msk8FrMthHjDw16kGU3QA9C6q2GxdLEK";

export const weatherService = {
  getAutocomplete,
  getWeatherOfTheWeek,
  getCurrentWeather,
};

async function getAutocomplete(q) {
  try {
    const data = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${q}&apikey=${API_KEY}`
    );
    return data.data;
  } catch (err) {}
}

async function getWeatherOfTheWeek(locationKey) {
  try {
    const data = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${API_KEY}`
    );
    return data.data;
  } catch (err) {}
}

async function getCurrentWeather(locationKey) {
  try {
    const data = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
    );
    return data.data;
  } catch (err) {}
}
