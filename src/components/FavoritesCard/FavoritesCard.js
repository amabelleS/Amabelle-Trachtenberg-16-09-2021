import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLocation } from './../../store/actions/weatherActions';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import Text from '../Text';
import humidityIcon from '../../assets/humidity_percentage_precipitation_icon.png';

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
      <S.Location>
        <LocationOnIcon fontSize="small" />
        <Text size="1rem" bold>
          {fav.name}, {fav.location.Country.LocalizedName}
        </Text>
      </S.Location>
      <S.ImageTextContainer>
        <img
          src={`https://developer.accuweather.com/sites/default/files/${
            fav.WeatherIcon < 10 ? `0${fav.WeatherIcon}` : fav.WeatherIcon
          }-s.png`}
          alt=""
        />
        <Text size="2rem" bold>
          {fav.Temperature.Metric.Value + `\u00b0`}
          <Text size="1.2rem">{fav.Temperature.Metric.Unit}</Text>
        </Text>
      </S.ImageTextContainer>

      <Text>{fav.WeatherText}</Text>
      <S.ImageTextContainer>
        <S.Humidity src={humidityIcon} alt="humidity" />
        <Text size="1.5rem">{fav.RelativeHumidity}</Text>
      </S.ImageTextContainer>
    </S.Card>
  );
};

export default FavoritesCard;
