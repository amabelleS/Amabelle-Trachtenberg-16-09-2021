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
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchCity(searchTerm) {
    setIsLoading(true);
    setError(false);

    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_MANY_API_KEY}&q=${searchTerm}`
      );

      console.log(
        '🚀 ~ file: useWeatherFetch.js ~ line 29 ~ fetchCity ~ response',
        response
      );
      if (response.data.length >= 1) {
        //   setCity((prev) => {
        //     return { ...prev, info: response.data[0] };
        //   });
        setAutoCompleteResults(response.data);
      } else {
        setError(true);
        // setAutoCompleteResults([]);
        console.log(
          '🚀 ~ file: useWeatherFetch.js ~ line 36 ~ fetchCity ~ error',
          error
        );
      }
    } catch (err) {
      setError(true);
      setIsLoading(false);
      console.log(
        '🚀 ~ file: useWeatherFetch.js ~ line 41 ~ fetchCity ~ err-catch',
        err
      );
    }

    setIsLoading(false);
  }

  async function fetcCityWeather(result, locationKey) {
    setAutoCompleteResults([]);
    setIsLoading(true);
    setError(false);
    const response = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${process.env.REACT_APP_MANY_API_KEY}&details=true`
    );

    const updatedCity = {
      ...city,
      info: result,
      current: response.data[0],
    };
    setCity(updatedCity);
  }

  async function fetcCityforcast() {
    setError(false);
    const response = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.info.Key}?apikey=${process.env.REACT_APP_MANY_API_KEY}&details=true&metric=true`
    );

    const updatedCity = {
      ...city,
      forcast: response.data,
    };
    setCity(updatedCity);
    setIsLoading(false);
  }

  useEffect(() => {
    fetcCityforcast();
    console.log(
      '🚀 ~ file: useWeatherFetch.js ~ line 92 ~ useWeatherFetch ~ city',
      city
    );
  }, [city.info]);

  return {
    city,
    isLoading,
    error,
    fetchCity,
    autoCompleteResults,
    setCity,
    fetcCityWeather,
  };
};
