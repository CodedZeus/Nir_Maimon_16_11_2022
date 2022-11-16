import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { weatherService } from "../services/weatherService";
import "./Home.css";
import { localStorageService } from "../services/localStorageService";

const dailyweek = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

export default function Home(props) {
  const [weatherDays, setWeatherDays] = useState([]);
  const [currentLocation, setCurrrentLocation] = useState();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (isFav && currentLocation) {
      const favorites = localStorageService.get("favorites") || [];
      console.log({ favorites });
      const idx = favorites.findIndex((f) => f.key === currentLocation.key);
      console.log({ idx });
      if (idx === -1) {
        setIsFav(false);
      } else {
        setIsFav(true);
      }
    }
  }, [currentLocation]);

  async function chooseLocation(name, key) {
    const weatherDays = await weatherService.getWeatherOfTheWeek(key);
    const curerentWeather = await weatherService.getCurrentWeather(key);
    setWeatherDays(weatherDays.DailyForecasts);
    const current = {
      key,
      name,
      value: curerentWeather[0].Temperature?.Metric?.Value,
      unit: curerentWeather[0].Temperature?.Metric?.Unit,
    };
    setCurrrentLocation(current);
  }

  useEffect(() => {
    if (props.locations[0]) {
      chooseLocation(props.locations[0].name, props.locations[0].Key);
    }
  }, [props.locations[0]]);

  function toggle() {
    const favorites = localStorageService.get("favorites") || [];
    if (isFav) {
      const idx = favorites.findIndex((f) => f.key === currentLocation.key);
      favorites.splice(idx, 1);
      localStorageService.save("favorites", [...favorites]);
    } else {
      localStorageService.save("favorites", [...favorites, currentLocation]);
    }
    setIsFav(!isFav);
  }

  return (
    <div id="home1">
      <header>
        <Link to={"/"}>
          <button id="btn">Home</button>
        </Link>
        <Link to={"/favorites"}>
          <button id="btn">Favorites</button>
        </Link>
      </header>
      <br />
      <br />
      <br />
      <h2>{currentLocation?.name}</h2>
      <button onClick={() => toggle()}>
        {isFav ? "Remove from favorites" : "Add to favorites"}
      </button>
      <br />
      <input
        id="inputone"
        type="text"
        value={props.text}
        onChange={(ev) => props.setText(ev.target.value)}
      />
      <br />
      <ul>
        {props.locations.map((l) => {
          return (
            <li
              key={l.Key}
              onClick={() => chooseLocation(l.LocalizedName, l.Key)}
            >
              {l.LocalizedName}
            </li>
          );
        })}
      </ul>

      <div>
        {weatherDays.map((day, idx) => {
          return (
            <div id="h3check" style={{ row: "flex" }} key={idx}>
              <h2>{dailyweek[new Date(day.Date).getDay().toString()]}</h2>
              {day.Temperature.Minimum.Value} {day.Temperature.Minimum.Unit}
            </div>
          );
        })}
      </div>
    </div>
  );
}
