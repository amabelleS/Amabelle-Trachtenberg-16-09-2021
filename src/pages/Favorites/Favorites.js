import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Card from '../../components/FavoritesCard';
import Text from '../../components/Text';

import FavoriteIcon from '@material-ui/icons/Favorite';

import { getFavoritesWeather } from './../../store/actions/favoritesActions';

import * as S from './style';

const Favorites = () => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await dispatch(getFavoritesWeather());
        setFavorites(res);
      } catch (error) {
        console.log(
          '🚀 ~ file: Favorites.js ~ line 29 ~ useEffect ~ error',
          error
        );
      }
    };
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelMetric = () => {
    setIsMetric(!isMetric);
  };

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="42px" bold color="#84ffff">
            Favorites
            <FavoriteIcon
              color="error"
              fontSize="medium"
              style={{ margin: '0 0.4rem 0 0.4rem ' }}
            />
          </Text>
          <S.FavBtn onClick={handelMetric}>
            <Text bold size="1rem">
              {isMetric ? 'Show Farhrenheit' : 'Show Celcius'}
            </Text>
          </S.FavBtn>
        </S.Header>

        <S.List>
          {favorites &&
            favorites.map((fav) => (
              <Card isMetric={isMetric} fav={fav} key={fav.key}></Card>
            ))}
        </S.List>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
