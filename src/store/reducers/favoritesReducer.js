import * as types from '../actions/types';

const initialState = {
  // location: null,
  locations: JSON.parse(localStorage.getItem('favorites')) || [],
  keys: JSON.parse(localStorage.getItem('keys')) || [],
  isLoading: false,
};

const favoritesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.table({ type, payload });
  switch (type) {
    case types.ADD_TO_FAVORITE: {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...state.locations, payload])
      );
      localStorage.setItem(
        'keys',
        JSON.stringify([...state.keys, payload.Key])
      );
      return {
        ...state,
        locations: [...state.locations, payload],
        keys: [...state.keys, payload.Key],
      };
    }

    case types.SET_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    case types.REMOVE_FROM_FAVORITE: {
      const updatedLocations = [...state.locations].filter(
        (loc) => loc.Key !== payload
      );
      const updatedKeys = [...state.keys].filter((key) => key !== payload);
      localStorage.setItem('favorites', JSON.stringify(updatedLocations));
      localStorage.setItem('keys', JSON.stringify(updatedKeys));
      return {
        ...state,
        locations: updatedLocations,
        keys: updatedKeys,
      };
    }
    default:
      return state;
  }
};

export default favoritesReducer;
