import React, { useState, useEffect, useContext } from 'react';
import Context from '../../context/favorites/context';
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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import * as S from './style';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {
  const {
    city,
    isLoading,
    fetchCity,
    error,
    autoCompleteResults,
    fetcCityWeather,
  } = useWeatherFetch();
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

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

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  return (
    <>
      {autoCompleteResults.length && searchTerm ? (
        <S.Results>
          {autoCompleteResults.map((result) => (
            <div
              className="result"
              onClick={() => fetcCityWeather(result, result.Key)}
              key={result.Key}
            >
              {result.LocalizedName}, {result.Country.LocalizedName}
            </div>
          ))}
        </S.Results>
      ) : null}
      <S.Home>
        <S.Content>
          <S.Header>
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
          </S.Header>

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
          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner
                color="primary"
                size="6rem"
                thickness={3}
                variant="indeterminate"
              />
            </S.SpinnerWrapper>
          )}
        </S.Content>
      </S.Home>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{'No match'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            There Was no match for the city title you have entered. Please check
            your spelling.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
