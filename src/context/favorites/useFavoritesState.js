import { useReducer, useEffect } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-hoveredCity':
      return { ...state, hoveredCity: action.payload };
    case 'set-favorites':
      localStorage.setItem('favorites', JSON.stringify(action.payload));
      return { ...state, favorites: action.payload };
    case 'set-favoritesKeys':
      localStorage.setItem('favoritesKeys', JSON.stringify(action.payload));
      return { ...state, favoritesKeys: action.payload };

    default:
      return state;
  }
};

const useFavoritesState = () => {
  const initialSate = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    favoritesKeys: JSON.parse(localStorage.getItem('favoritesKeys')) || [],
    hoveredCity: null,
  };
  const [favoritesState, favoritesDispatch] = useReducer(reducer, initialSate);

  const handleMouseEnter = (locationKey) => {
    favoritesDispatch({
      type: 'set-hoveredCity',
      payload: locationKey,
    });
  };

  const handleMouseLeave = () => {
    favoritesDispatch({
      type: 'set-hoveredCity',
      payload: null,
    });
  };

  const isCityInFavorites = (locationKey) => {
    return favoritesState.favoritesKeys.includes(locationKey);
  };

  // const editFavorite = (user, text) => {
  //   const uuid = user.login.uuid;

  //   const updatedFavorite = { ...user, freeTextInput: text };
  //   const updatedFavorites = [
  //     ...favoritesState.favorites.map((favorite) =>
  //       favorite.login.uuid === uuid ? updatedFavorite : favorite
  //     ),
  //   ];

  //   favoritesDispatch({
  //     type: 'set-favorites',
  //     payload: updatedFavorites,
  //   });
  // };

  const switchFavorites = (city) => {
    const cityKey = city.info.Key;
    console.log(cityKey);
    // check if user is not in favorites list
    if (!isCityInFavorites(cityKey)) {
      // then add him to the list, adding freeTextInput
      const updatedFavorites = [...favoritesState.favorites, city];
      const updatedCityKeys = [...favoritesState.favoritesKeys, cityKey];

      favoritesDispatch({
        type: 'set-favorites',
        payload: updatedFavorites,
      });

      favoritesDispatch({
        type: 'set-favoritesKeys',
        payload: updatedCityKeys,
      });
    } else {
      //remove from favorites
      const updatedFavorites = [...favoritesState.favorites].filter(
        (fav) => fav.info.Key !== cityKey
      );
      const updatedCityKeys = [...favoritesState.favoritesKeys].filter(
        (key) => key !== cityKey
      );
      favoritesDispatch({
        type: 'set-favorites',
        payload: updatedFavorites,
      });

      favoritesDispatch({
        type: 'set-favoritesKeys',
        payload: updatedCityKeys,
      });
    }
  };

  useEffect(() => {
    console.log(favoritesState);
  }, [favoritesState]);

  return {
    favoritesState,
    favoritesDispatch,
    handleMouseEnter,
    handleMouseLeave,
    isCityInFavorites,
    switchFavorites,
    // editFavorite,
  };
};

export default useFavoritesState;
