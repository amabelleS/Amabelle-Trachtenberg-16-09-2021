import * as types from './types';

export const addToFavorites = () => {
  return (dispatch, getState) => {
    const state = getState();
    console.log(
      '🚀 ~ file: favoritesActions.js ~ line 10 ~ return ~ state',
      state
    );
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
    // localStorage.setItem('favorites', JSON.stringify(state.favorites));
  };
};
