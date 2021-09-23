import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useGeoLocation from '../../hooks/useGeoLocation';

import {
  getLocation,
  getLocationByGeoLocation,
  setLocation,
  getWeatherForcast,
  getWeatherToday,
} from './../../store/actions/weatherActions';
import {
  addToFavorites,
  removeFromFavorites,
} from './../../store/actions/favoritesActions';

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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import humidityIcon from '../../assets/humidity_percentage_precipitation_icon.png';

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
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const favoritesKeys = useSelector((state) => state.favorites.keys);
  const selectedLocation = useSelector((state) => state.weather.location);
  const isLoading = useSelector((state) => state.weather.isLoading);
  // const error = useSelector((state) => state.weather.error);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const location = useGeoLocation();

  useEffect(() => {
    const onMountHome = async () => {
      if (!selectedLocation) {
        try {
          const res = await dispatch(getLocation('tel aviv'));
          await dispatch(setLocation(res[0]));
          fetchInfo();
        } catch (err) {
          console.log('🚀 ~ file: Home.js ~ line 85 ~ onMountHome ~ err', err);
        }
      }
    };

    // onMountHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchWeatherByGeoPosition = async () => {
      if (!selectedLocation && location.loaded) {
        try {
          const res = await dispatch(
            getLocationByGeoLocation(
              location.coordinates.lat,
              location.coordinates.lng
            )
          );
          await dispatch(setLocation(res));
          fetchInfo();
        } catch (err) {
          console.log(
            '🚀 ~ file: Home.js ~ line 96 ~ fetchWeatherByGeoPosition ~ err',
            err
          );
          // setError(true);
        }
      }
    };

    fetchWeatherByGeoPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onKeydownHandle = (e) => e.key === 'Enter' && onSearchHandle();

  const onSearchHandle = async () => {
    const res = await dispatch(getLocation(searchTerm));
    if (res.length < 1) {
      setError(true);
    }
    setSearchResult(res);
  };

  const onSelectLocationHandle = async (location) => {
    dispatch(setLocation(location));
    setSearchResult([]);
    setSearchTerm('');
    fetchInfo();
  };

  useEffect(() => {
    if (searchTerm) return;
    setSearchResult([]);
  }, [searchTerm]);

  useEffect(() => {
    if (!selectedLocation) return;
    console.log(
      '🚀 ~ file: Home.js ~ line 100 ~ Home ~ selectedLocation',
      selectedLocation
    );
    fetchInfo();
    console.log(
      '🚀 ~ file: Home.js ~ line 107 ~ useEffect ~ weatherInfo',
      weatherInfo
    );
  }, [selectedLocation]);

  const fetchInfo = async () => {
    const today = await dispatch(getWeatherToday());
    const forcast = await dispatch(getWeatherForcast());
    const updatedCityWeather = {
      today: today[0],
      forcast,
    };
    setWeatherInfo(updatedCityWeather);
  };

  const isLocSaved = () => {
    if (!selectedLocation) return;
    return favoritesKeys.includes(selectedLocation.Key);
  };

  const toggleSave = () => {
    if (!selectedLocation) return;
    dispatch(
      isLocSaved()
        ? removeFromFavorites(selectedLocation.Key)
        : addToFavorites()
    );
    // console.log('🚀 ~ file: Home.js ~ line 74 ~ Home ~ favs', favoritesKeys);
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
      {searchResult.length && searchTerm ? (
        <S.Results>
          {searchResult.map((result) => (
            <div
              className="result"
              onClick={() => onSelectLocationHandle(result)}
              key={result.Key}
            >
              {result.LocalizedName}, {result.Country.LocalizedName}
            </div>
          ))}
        </S.Results>
      ) : null}
      <S.Home>
        <S.Content>
          {/* <Text>
            {location.loaded
              ? JSON.stringify(location)
              : 'location data not availble'}
          </Text> */}
          <S.Header>
            <FormControl>
              <S.SearchSubmitContainer>
                <S.FlexColumLeft>
                  {/* <InputLabel htmlFor="my-input">Search Your City</InputLabel> */}
                  <Input
                    id="my-input"
                    aria-describedby="my-helper-text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={onKeydownHandle}
                    style={{ width: '11rem' }}
                  />
                  <FormHelperText id="my-helper-text">
                    Search by city name.
                  </FormHelperText>
                </S.FlexColumLeft>
                <IconButton
                  type="submit"
                  sx={{ p: '10px' }}
                  aria-label="search"
                  onClick={onSearchHandle}
                >
                  <SearchIcon />
                </IconButton>
              </S.SearchSubmitContainer>
            </FormControl>
          </S.Header>

          <S.CityContainer>
            <S.CurrentHeader>
              <S.FlexColumLeft>
                <Text size="2rem" bold>
                  <LocationOnIcon fontSize="medium" />
                  {selectedLocation && weatherInfo
                    ? selectedLocation.LocalizedName +
                      ', ' +
                      selectedLocation.Country.LocalizedName
                    : null}
                </Text>

                <Text size="1.7rem">
                  {weatherInfo ? weatherInfo.today.WeatherText : ''}
                </Text>
                <S.ImageTextContainer>
                  <Text size="1.5rem">
                    {weatherInfo ? weatherInfo.today.RelativeHumidity : ''}
                  </Text>
                  <S.Humidity src={humidityIcon} alt="humidity" />
                </S.ImageTextContainer>
              </S.FlexColumLeft>
              {weatherInfo ? (
                <S.FlexColumCenter>
                  <S.ImageContainer
                    src={`https://developer.accuweather.com/sites/default/files/${
                      weatherInfo.today.WeatherIcon < 10
                        ? `0${weatherInfo.today.WeatherIcon}`
                        : weatherInfo.today.WeatherIcon
                    }-s.png`}
                    alt=""
                  />
                  <Text size="2rem" bold>
                    {selectedLocation && weatherInfo
                      ? weatherInfo.today.Temperature.Metric.Value +
                        '\u00b0' +
                        weatherInfo.today.Temperature.Metric.Unit
                      : null}
                  </Text>
                </S.FlexColumCenter>
              ) : null}
              <S.IconButtonWrapper
                onClick={toggleSave}
                isVisible={selectedLocation && isLocSaved()}
              >
                <Button
                  // variant="outlined"
                  color="primary"
                  startIcon={<FavoriteIcon color="error" />}
                >
                  {isLocSaved() ? 'Remove' : 'Add To Favorites'}
                </Button>
              </S.IconButtonWrapper>
            </S.CurrentHeader>
            {isMobile ? null : (
              <Text bold size="2rem">
                {weatherInfo ? weatherInfo.forcast.Headline.Text : ''}
              </Text>
            )}
            <S.List>
              {weatherInfo &&
                weatherInfo.forcast.DailyForecasts.map((day, index) => {
                  return <Card day={day} key={index}></Card>;
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
