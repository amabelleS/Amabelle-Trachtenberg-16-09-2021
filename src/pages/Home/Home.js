import React, { useState, useEffect } from 'react';
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

import SearchIcon from '@mui/icons-material/Search';
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: '',
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const location = useGeoLocation();
  const [isMetric, setIsMetric] = useState(true);

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
          setError({
            isError: true,
            message:
              'Geolocation not supported, Please enable to get your locations weather. ' +
              err.message,
          });
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
      setError({
        isError: true,
        message: `There Was no match for the city title you have entered. Please check
            your spelling.`,
      });
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
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

  const fetchInfo = async () => {
    const today = await dispatch(getWeatherToday());
    const forcast = await dispatch(getWeatherForcast(isMetric));
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
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (error.isError) {
      setOpen(true);
    }
  }, [error]);

  const handelMetric = () => {
    setIsMetric(!isMetric);
  };

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMetric]);

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
          <S.Header>
            <S.SearchSubmitContainer>
              <S.InputSearch
                placeholder="Enter city name"
                type="text"
                name="search"
                onChange={handleInputChange}
                onKeyDown={onKeydownHandle}
                value={searchTerm}
              />
              <S.Toggle onClick={onSearchHandle}>
                <SearchIcon />
              </S.Toggle>
            </S.SearchSubmitContainer>
            <S.FavBtn onClick={handelMetric}>
              <Text bold size="1rem">
                {isMetric ? 'Show Farhrenheit' : 'Show Celcius'}
              </Text>
            </S.FavBtn>
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
                    {selectedLocation && weatherInfo && isMetric
                      ? weatherInfo.today.Temperature.Metric.Value +
                        '\u00b0' +
                        weatherInfo.today.Temperature.Metric.Unit
                      : weatherInfo && !isMetric
                      ? weatherInfo.today.Temperature.Imperial.Value +
                        '\u00b0' +
                        weatherInfo.today.Temperature.Imperial.Unit
                      : null}
                  </Text>
                </S.FlexColumCenter>
              ) : null}
              <S.FavBtn
                onClick={toggleSave}
                isVisible={selectedLocation && isLocSaved()}
              >
                <FavoriteIcon color="error" />
                <Text size="1.2rem" bold>
                  {isLocSaved() ? 'Remove' : 'Add To Favorites'}
                </Text>
              </S.FavBtn>
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
            {error.message}
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
