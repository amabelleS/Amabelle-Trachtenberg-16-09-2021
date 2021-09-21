import axios from 'axios';
import * as types from './types';

export const getLocation = (searchTerm) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_RESERVE_API_KEY}&q=${searchTerm}`
    );

    dispatch({ type: types.SET_LOADING, payload: false });
    return res.data;
  };
};

export const setLocation = (location) => {
  return { type: types.SET_LOCATION, payload: location };
};

export const getWeatherForcast = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const { Key } = state.weather.location;
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${Key}?apikey=${process.env.REACT_APP_RESERVE_API_KEY}`
    );
    // dispatch({ type: "SET_TODOS", payload: res.data });
    dispatch({ type: types.SET_LOADING, payload: false });
    return res.data;
  };
};
export const getWeatherToday = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const { Key } = state.weather.location;
    dispatch({ type: types.SET_LOADING, payload: true });
    const res = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${Key}?apikey=${process.env.REACT_APP_RESERVE_API_KEY}&details=true`
    );
    // dispatch({ type: "SET_TODOS", payload: res.data });
    dispatch({ type: types.SET_LOADING, payload: false });
    return res.data;
  };
};
