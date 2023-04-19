import React, { useState } from "react";
import Form from "../components/Form";
import Card from "./Card";

const WeatherPanel = () => {
  let urlWeather =
    "https://api.openweathermap.org/data/2.5/weather?&appid=32a721166f3a951c9e067c4059166414&lang=es";

  let cityUrl = "&q=";

  let urlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?&appid=32a721166f3a951c9e067c4059166414&lang=es";

  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");

  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc); 

    //weather

    urlWeather = urlWeather + cityUrl + loc;

    await fetch(urlWeather)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((weatherData) => {
        setWeather(weatherData);
        console.log(weatherData);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setShow(false);
      });

    //forecast

    urlForecast = urlForecast + cityUrl + loc;

    await fetch(urlForecast)
      .then((response) => {
        if (!response.ok) throw { response };
        return response.json();
      })
      .then((forecastData) => {
        setWeather(forecastData);
        console.log(forecastData);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setShow(false);
      });
  };
  return (
    <React.Fragment>
      <Form newLocation={getLocation} />

      <Card
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
      />
    </React.Fragment>
  );
};
export default WeatherPanel;
