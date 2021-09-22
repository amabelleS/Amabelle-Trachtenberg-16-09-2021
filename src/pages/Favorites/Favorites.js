import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setLocation } from './../../store/actions/weatherActions';

import Card from '../../components/FavoritesCard';
import Text from '../../components/Text';

import FavoriteIcon from '@material-ui/icons/Favorite';

import { getFavoritesWeather } from './../../store/actions/favoritesActions';

import * as S from './style';

const Favorites = () => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);

  // let history = useHistory();

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

  // const handelNavigateToHome = (e, fav) => {
  //   // e.stopPropagation();
  //   console.log(
  //     '🚀 ~ file: Favorites.js ~ line 38 ~ handelNavigateToHome ~ fav',
  //     fav
  //   );
  //   dispatch(setLocation(fav.location));
  //   history.push('/home');
  // };

  return (
    <S.Favorites>
      <S.Content>
        {/* <S.Header> */}
        <Text size="42px" bold color="#84ffff">
          Favorites
          <FavoriteIcon
            color="error"
            fontSize="medium"
            style={{ margin: '0 0.4rem 0 0.4rem ' }}
          />
        </Text>
        {/* </S.Header> */}

        <S.List>
          {favorites &&
            favorites.map((fav) => (
              <Card
                fav={fav}
                key={fav.key}
                // onClick={(fav) => handelNavigateToHome(fav)}
              ></Card>
            ))}
        </S.List>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
