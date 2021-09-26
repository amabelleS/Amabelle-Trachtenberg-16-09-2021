import axios from 'axios';
import * as types from './types';

export const addToFavorites = () => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: types.ADD_TO_FAVORITE,
      payload: state.weather.location,
    });
  };
};

export const removeFromFavorites = (key = null) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: types.REMOVE_FROM_FAVORITE,
      payload: state.weather.location?.Key || key,
    });
  };
};

export const getFavoritesWeather = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: types.SET_LOADING, payload: true });
    const promises = state.favorites.locations.map(
      (loc) =>
        new Promise(async (resolve) => {
          const res = await axios.get(
            `https://dataservice.accuweather.com/currentconditions/v1/${loc.Key}?apikey=${process.env.REACT_APP_BLUEBELL_API_KEY}&details=true`
          );
          const key = loc.Key;
          const name = loc.LocalizedName;
          const city = { ...res.data[0], key, name, location: loc };
          resolve(city);
        })
    );

    const data = await Promise.all(promises);
    dispatch({ type: types.SET_LOADING, payload: false });
    return data;
  };
};
