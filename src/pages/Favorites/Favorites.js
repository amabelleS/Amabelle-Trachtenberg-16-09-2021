import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/FavoritesCard';

import { getFavoritesWeather } from './../../store/actions/favoritesActions';

import * as S from './style';

const Favorites = () => {
  // const favoritesKeys = useSelector((state) => state.favorites.keys);
  // const selectedLocation = useSelector((state) => state.weather.location);
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await dispatch(getFavoritesWeather());
        setFavorites(res);
        console.log('🚀 ~ file: Favorites.js ~ line 26 ~ useEffect ~ res', res);
      } catch (error) {
        console.log(
          '🚀 ~ file: Favorites.js ~ line 29 ~ useEffect ~ error',
          error
        );
      }
    };
    // fetchFavorites();
  }, []);

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>Favorites</S.Header>
        <S.List>
          {favorites &&
            favorites.map((fav) => <Card fav={fav} key={fav.key}></Card>)}
        </S.List>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
