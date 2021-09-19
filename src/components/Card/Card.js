import React, { useContext } from 'react';
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
      <Text>
        {day.Temperature.Maximum.Value +
          '\u00b0' +
          day.Temperature.Maximum.Unit +
          ' / ' +
          day.Temperature.Minimum.Value +
          '\u00b0' +
          day.Temperature.Minimum.Unit}
      </Text>
    </S.Card>
  );
};

export default Card;
