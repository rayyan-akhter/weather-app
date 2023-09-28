import React, { useEffect, useState } from "react";
import clearsky from "../asset/clearSky.jpg";
import axios from "axios";
import clouds from "../asset/cloud.png";
import "./Weather.css";
import { IoIosSearch } from "react-icons/io";
import { SiWindicss } from "react-icons/si";
import { WiHumidity } from "react-icons/wi";
import { PiWind } from "react-icons/pi";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import temperature from "../asset/temperature.png";
import Spinner from "./spinner";
export const WeatherApp = () => {
  const [location, setLocation] = useState("");
  // const [unit, setUnit] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInCelcius, setShowIncelcius] = useState(false);

  const apiKey = "4a37db8b9fa21fbeebb2679d7b480327";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;
  const getWeather = () => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((Response) => {
        setWeather(Response.data);
        setError("");
      })
      .catch((error) => {
        setWeather(null);
        setError("location not found");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleCelsiusChange = (value) => {
    const converted = ((value - 32) * 5) / 9;
    return converted.toFixed(2);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const wetherApiwithLatandLong = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

      const getWeather = () => {
        setLoading(true);
        axios
          .get(wetherApiwithLatandLong)
          .then((Response) => {
            setWeather(Response.data);
            setError("");
          })
          .catch((error) => {
            setWeather(null);
            setError("location not found");
          })
          .finally(() => {
            setLoading(false);
          });
      };
      getWeather();
    });
  }, []);

  return (
    <main>
      {weather && <img src={clearsky} className="coverImage" alt="cover" />}
      <div className="weatherUpperContainer">
        <div className="header">
          <form></form>
          <div className="iconContainer"
       
          >
            <input
              className="search"
              placeholder="Search location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
            />
            <FaLocationCrosshairs className="locationIcon"
            
            />
          </div>

          <div className="btnContainer">
            {!loading ? (
              <button className="searchBtnContainer"
                style={{
                  border: "none",
                  background: "transparent",
                  opacity: !location ? 0.5 : 1,
                  display: "grid",
                  placeItems: "center",
                }}
                disabled={!location}
              >
                <IoIosSearch
                  color="white"
                  size={30}
                  className="searchBtn"
                  onClick={getWeather}
                />
              </button>
            ) : (
              <Spinner />
            )}

            {weather?.main?.temp && (
              <div className="unitsContainer ">
                <p
                  className="celcius"
                  onClick={(e) => setShowIncelcius(true)}
                  style={{
                    color: showInCelcius ? "red" : "white",
                    cursor: "pointer",
                  }}
                >
                  °C
                </p>
                /
                <p
                  className="ferhenite"
                  onClick={(e) => setShowIncelcius(false)}
                  style={{
                    color: !showInCelcius ? "red" : "white",
                    cursor: "pointer",
                  }}
                >
                  °F
                </p>
              </div>
            )}
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        {weather && (
          <div className="weatherInfo">
            <div className="weatherInfoUpper">
              <h1 className="locationName">
                {" "}
                {weather.name},{weather.sys.country}
              </h1>
            </div>
            <div className="weatherInfoBottom">
              <div className="weatherTemperature">
                <div className="weatherTemperatureUpper">
                  <img
                    src={temperature}
                    alt="temperatureImage"
                    className="temperatureImage"
                  />
                  <h1 className="temperature">
                    {!showInCelcius
                      ? weather.main.temp.toFixed(2)
                      : handleCelsiusChange(weather.main.temp)}
                    &deg;{showInCelcius ? "C" : "F"}
                  </h1>
                </div>
                <div className="weatherTemperatureLower">
                  <p>max.{weather.main.temp_max},</p>
                  <p>min.{weather.main.temp_min}</p>
                </div>
              </div>

              <div className="imageContainer">
                <img src={clouds} alt="cloudImage" />
              </div>
              <div className="weatherComponents">
                <h1 className="weatherType"> {weather.weather[0].main}</h1>
                <div className="weatherComponentsContainer">
                  <div className="components">
                    <PiWind size={3} color="white" className="icon" />
                    <p>wind speed :</p>
                    <p className="componentsValue">{weather.wind.speed}km/h</p>
                  </div>
                  <div className="components">
                    <WiHumidity color="white" size={3} className="icon" />
                    <p>humidity : </p>
                    <p className="componentsValue">{weather.main.humidity}%</p>
                  </div>
                  <div className="components">
                    <LiaTemperatureHighSolid
                      size={3}
                      color="white"
                      className="icon"
                    />
                    <p>temperature :</p>
                    <p className="componentsValue">
                      {!showInCelcius
                        ? weather.main.temp.toFixed(2)
                        : handleCelsiusChange(weather.main.temp)}
                      &deg;{showInCelcius ? "C" : "F"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hourltForecast"></div>
            <div className="dailyForecast"></div>
          </div>
        )}
      </div>
    </main>
  );
};

//  default WeatherApp;
