import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Context from '../../context/favorites/context';
import { useWeatherFetch } from '../../hooks/useWeatherFetch';

import {
  getLocation,
  setLocation,
  getWeatherForcast,
  getWeatherToday,
  // addToFavorites,
  // removeFromFavorites,
} from './../../store/actions/weatherActions';
import {
  // getLocation,
  // setLocation,
  // getWeatherInfo,
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
    // city,
    isLoading,
    // fetchCity,
    error,
    // autoCompleteResults,
    fetcCityWeather,
  } = useWeatherFetch();

  // const {
  //   // favoritesState,
  //   // handleMouseEnter,
  //   // handleMouseLeave,
  //   isCityInFavorites,
  //   switchFavorites,
  // } = useContext(Context);

  // -----
  // const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const favoritesKeys = useSelector((state) => state.favorites.keys);
  const selectedLocation = useSelector((state) => state.weather.location);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onMountHome = async () => {
      try {
        const res = await dispatch(getLocation('tel aviv'));
        await dispatch(setLocation(res[0]));
        fetchInfo();
      } catch (err) {
        console.log('🚀 ~ file: Home.js ~ line 85 ~ onMountHome ~ err', err);
      }
    };

    // onMountHome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onKeydownHandle = (e) => e.key === 'Enter' && onSearchHandle();

  const onSearchHandle = async () => {
    // fetchCity(searchTerm);
    const res = await dispatch(getLocation(searchTerm));
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
    // console.log(
    //   '🚀 ~ file: Home.js ~ line 124 ~ useEffect ~ selectedLocation',
    //   selectedLocation
    // );
    if (!selectedLocation) return;
    fetchInfo();
  }, [selectedLocation]);

  const fetchInfo = async () => {
    const today = await dispatch(getWeatherToday());
    const forcast = await dispatch(getWeatherForcast());
    const updatedCityWeather = {
      today: today[0],
      forcast,
    };
    setWeatherInfo(updatedCityWeather);
    // console.log(
    //   '🚀 ~ file: Home.js ~ line 126 ~ fetchInfo ~ updatedCityWeather',
    //   updatedCityWeather
    // );
  };

  // const isLocSaved = useMemo(
  //   () => favList.some((loc) => loc.key === selectedLocation.Key),
  //   [favList, selectedLocation]
  // );

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
    console.log('🚀 ~ file: Home.js ~ line 74 ~ Home ~ favs', favoritesKeys);
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
              // onClick={() => fetcCityWeather(result, result.Key)}
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
            <FormControl>
              <S.SearchSubmitContainer>
                <S.FlexColum>
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
                </S.FlexColum>
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
              <S.FlexColum>
                <Text size="2rem" bold>
                  {selectedLocation && weatherInfo
                    ? selectedLocation.LocalizedName +
                      ', ' +
                      selectedLocation.Country.LocalizedName
                    : null}
                </Text>
                <Text size="1.5rem" bold>
                  {weatherInfo.today.Temperature.Metric.Value +
                    '\u00b0' +
                    weatherInfo.today.Temperature.Metric.Unit}
                </Text>
                <Text size="1.8rem">
                  {weatherInfo ? weatherInfo.today.WeatherText : ''}
                </Text>
              </S.FlexColum>
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
            <Text bold size="2rem">
              {weatherInfo ? weatherInfo.forcast.Headline.Text : ''}
            </Text>
            {/* <S.FlexColum> */}

            <S.List>
              {weatherInfo &&
                weatherInfo.forcast.DailyForecasts.map((day, index) => {
                  return <Card city={weatherInfo} day={day} key={index}></Card>;
                })}
            </S.List>
            {/* </S.FlexColum> */}
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
