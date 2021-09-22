import React from 'react';
import moment from 'moment';
import Text from '../Text';

import * as S from './style';

const Card = ({ day }) => {
  const date = moment(day.Date, 'DD-MM-YYYY');
  const dayName = date.format('dddd');
  console.log(day);

  return (
    <S.Card>
      {<Text>{dayName}</Text>}
      <S.Images>
        <S.Temperature>
          <Text>
            {day.Temperature.Maximum.Value +
              '\u00b0' +
              day.Temperature.Maximum.Unit}
          </Text>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${
              day.Day.Icon < 10 ? `0${day.Day.Icon}` : day.Day.Icon
            }-s.png`}
            alt=""
          />
        </S.Temperature>
        <S.Temperature>
          <Text>
            {day.Temperature.Minimum.Value +
              '\u00b0' +
              day.Temperature.Minimum.Unit}
          </Text>
          <img
            src={`https://developer.accuweather.com/sites/default/files/${
              day.Night.Icon < 10 ? `0${day.Night.Icon}` : day.Night.Icon
            }-s.png`}
            alt=""
          />
        </S.Temperature>
      </S.Images>
    </S.Card>
  );
};

export default Card;
