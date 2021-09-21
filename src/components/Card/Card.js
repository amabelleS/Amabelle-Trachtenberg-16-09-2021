import React from 'react';
// import Moment from 'react-moment';
import moment from 'moment';
// import 'moment-timezone';
import Text from '../Text';

import * as S from './style';

const Card = ({ children, city, day }) => {
  const date = moment(day.Date, 'DD-MM-YYYY');
  const dayName = date.format('dddd');

  return (
    <S.Card>
      {/* <Text>{city.info.AdministrativeArea.LocalizedName}</Text> */}
      <Text>{dayName}</Text>
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
      {/* <Text>
        {day.Temperature.Maximum.Value +
          '\u00b0' +
          day.Temperature.Maximum.Unit +
          ' - ' +
          day.Temperature.Minimum.Value +
          '\u00b0' +
          day.Temperature.Minimum.Unit}
      </Text> */}
      {/* <S.Images>
        <img
          src={`https://developer.accuweather.com/sites/default/files/${
            day.Day.Icon < 10 ? `0${day.Day.Icon}` : day.Day.Icon
          }-s.png`}
          alt=""
        />
        <img
          src={`https://developer.accuweather.com/sites/default/files/${
            day.Night.Icon < 10 ? `0${day.Night.Icon}` : day.Night.Icon
          }-s.png`}
          alt=""
        />
      </S.Images> */}
    </S.Card>
  );
};

export default Card;
