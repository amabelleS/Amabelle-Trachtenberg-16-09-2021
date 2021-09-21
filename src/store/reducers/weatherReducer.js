import * as types from '../actions/types';

// import locationData from '../../data/autoComplete.json';
// import currentData from '../../data/currentDay.json';
// import forcastData from '../../data/forcast.json';

const initialState = {
  location: null,
  currentCity: {},
  forcast: {},
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

    default:
      return state;
  }
};

export default weatherReducer;
