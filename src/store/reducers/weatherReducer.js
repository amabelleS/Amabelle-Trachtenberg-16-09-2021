import * as types from '../actions/types';

const initialState = {
  location: null,
  currentCity: {},
  forcast: {},
  isLoading: false,
  error: null,
};

const weatherReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.table({ type, payload });
  switch (type) {
    case types.SET_LOCATION:
      return {
        ...state,
        location: payload,
      };

    case types.SET_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }

    default:
      return state;
  }
};

export default weatherReducer;
