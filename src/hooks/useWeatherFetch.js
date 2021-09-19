import { useState, useEffect } from 'react';
import axios from 'axios';

import locationData from '../data/autoComplete.json';
import currentData from '../data/currentDay.json';
import forcastData from '../data/forcast.json';

const initialState = {
  info: locationData[0],
  current: currentData[0],
  forcast: forcastData,
};

export const useWeatherFetch = () => {
  const [city, setCity] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchCity(searchTerm) {
    setIsLoading(true);
    setError(false);

    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_RESERVE_API_KEY}&q=${searchTerm}`
      );
      //   console.log(response);
      if (response.data.length >= 1) {
        setCity((prev) => {
          return { ...prev, info: response.data[0] };
        });
      }
    } catch (err) {
      setError(true);
      setIsLoading(false);
      console.log(err);
    }
  }

  async function fetcCityWeather() {
    // setIsLoading(true);
    // setError(false);
    const response = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${city.info.Key}?apikey=${process.env.REACT_APP_RESERVE_API_KEY}&details=true`
    );

    const updatedCity = {
      ...city,
      current: response.data[0],
    };

    setCity(updatedCity);
  }

  async function fetcCityforcast() {
    // setError(false);

    const response = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.info.Key}?apikey=${process.env.REACT_APP_RESERVE_API_KEY}&details=true&metric=true`
    );

    const updatedCity = {
      ...city,
      forcast: response.data,
    };

    setCity(updatedCity);
    setIsLoading(false);
  }

  useEffect(() => {
    fetcCityWeather();
    fetcCityforcast();
  }, [city.info]);

  useEffect(() => {
    console.log(city);
  }, [city.forcast]);

  return {
    city,
    isLoading,
    error,
    fetchCity,
  };
};
