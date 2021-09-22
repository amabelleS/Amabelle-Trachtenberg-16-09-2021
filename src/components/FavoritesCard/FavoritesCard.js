import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLocation } from './../../store/actions/weatherActions';

import Text from '../Text';

import * as S from './style';

const FavoritesCard = ({ fav }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const handelNavigateToHome = () => {
    // e.stopPropagation();
    console.log(
      '🚀 ~ file: FavoritesCard.js ~ line 15 ~ handelNavigateToHome ~ fav',
      fav
    );

    dispatch(setLocation(fav.location));
    history.push('/home');
  };

  return (
    <S.Card onClick={handelNavigateToHome}>
      <Text>{fav.name}</Text>
    </S.Card>
  );
};

export default FavoritesCard;
