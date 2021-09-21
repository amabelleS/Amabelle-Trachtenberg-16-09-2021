import { combineReducers } from 'redux';
import weather from '../reducers/weatherReducer';
import favorites from '../reducers/favoritesReducer';

export default combineReducers({
  weather,
  favorites,
});
