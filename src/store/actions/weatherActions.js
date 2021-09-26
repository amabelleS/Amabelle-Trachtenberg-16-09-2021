import axios from 'axios';
import * as types from './types';

export const getLocation = (searchTerm) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_BLUEBELL_API_KEY}&q=${searchTerm}`
    );

    dispatch({ type: types.SET_LOADING, payload: false });
    return res.data;
  };
};

export const getLocationByGeoLocation = (lat, lng) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${process.env.REACT_APP_BLUEBELL_API_KEY}&q=${lat}%2C${lng}&details=true&toplevel=true`
    );
    dispatch({ type: types.SET_LOADING, payload: false });
    return res.data;
  };
};

export const setLocation = (location) => {
  return { type: types.SET_LOCATION, payload: location };
};

export const getWeatherForcast = (isMetric) => {
  return async (dispatch, getState) => {
    const state = getState();
    const { Key } = state.weather.location;
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${process.env.REACT_APP_BLUEBELL_API_KEY}&metric=${isMetric}`
    );
    dispatch({ type: types.SET_LOADING, payload: false });
    return res.data;
  };
};

export const getWeatherToday = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const { Key } = state.weather?.location || 215854;
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${process.env.REACT_APP_BLUEBELL_API_KEY}&details=true`
    );
    dispatch({ type: types.SET_LOADING, payload: false });
    return res.data;
  };
};
