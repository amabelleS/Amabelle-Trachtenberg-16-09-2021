import React, { useState, useEffect, useContext } from 'react';
import Context from '../../context/favorites/context';
// import Text from 'components/Text';
import { useWeatherFetch } from '../../hooks/useWeatherFetch';

import Text from '../../components/Text';
import Card from '../../components/Card';
import Spinner from '../../components/Spinner';

import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import SearchIcon from '@mui/icons-material/Search';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import * as S from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {
  const { city, isLoading, fetchCity, error } = useWeatherFetch();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = React.useState(false);

  const {
    // favoritesState,
    // handleMouseEnter,
    // handleMouseLeave,
    isCityInFavorites,
    switchFavorites,
  } = useContext(Context);
  //   const { hoveredCity } = favoritesState;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handelSubmit = () => {
    fetchCity(searchTerm);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <S.Home>
      <S.Content>
        <FormControl>
          <S.SearchSubmitContainer>
            <S.SearchContainer>
              {/* <InputLabel htmlFor="my-input">Search Your City</InputLabel> */}
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                value={searchTerm}
                onChange={handleInputChange}
                style={{ width: '11rem' }}
              />
              <FormHelperText id="my-helper-text">
                Search by city name.
              </FormHelperText>
            </S.SearchContainer>
            <IconButton
              type="submit"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={handelSubmit}
            >
              <SearchIcon />
            </IconButton>
          </S.SearchSubmitContainer>
        </FormControl>

        <S.CityContainer
        //   onMouseEnter={() => handleMouseEnter(city)}
        //   onMouseLeave={handleMouseLeave}
        >
          <S.CurrentHeader>
            <Text size="2rem" bold>
              {city
                ? city.info.AdministrativeArea.LocalizedName +
                  ' ' +
                  city.current.Temperature.Metric.Value +
                  '\u00b0' +
                  city.current.Temperature.Metric.Unit
                : null}
            </Text>
            <Text size="1.8rem">{city ? city.current.WeatherText : ''}</Text>
            <S.IconButtonWrapper
              onClick={() => switchFavorites(city)}
              isVisible={isCityInFavorites(city.info.Key)}
            >
              <Button
                // variant="outlined"
                startIcon={<FavoriteIcon color="error" />}
              >
                {isCityInFavorites(city.info.Key)
                  ? 'Remove'
                  : 'Add To Favorites'}
              </Button>
            </S.IconButtonWrapper>
          </S.CurrentHeader>

          <Text bold size="2rem">
            {city ? city.forcast.Headline.Text : ''}
          </Text>
          <S.List>
            {city &&
              city.forcast.DailyForecasts.map((day, index) => {
                return <Card city={city} day={day} key={index}></Card>;
              })}
          </S.List>
        </S.CityContainer>
        {/* <S.CityContainer>
          <p>
            city name:{' '}
            {city ? city.info.AdministrativeArea.LocalizedName : null}
          </p>
          <p>
            Temp:{' '}
            {city
              ? city.DailyForcast.ApparentTemperature.Metric.Value +
                '' +
                city.DailyForcast.ApparentTemperature.Metric.Unit
              : null}
          </p>
          <p>favorites</p>
          <p>forcast</p>
          <p>5 day forcast</p>
        </S.CityContainer> */}
      </S.Content>
      {isLoading && (
        <S.SpinnerWrapper>
          <Spinner
            color="primary"
            size="45px"
            thickness={6}
            variant="indeterminate"
          />
        </S.SpinnerWrapper>
      )}
    </S.Home>
  );
};

export default Home;
