import React, { useState, useEffect } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: {
      lat: '',
      lng: '',
    },
  });

  const onSuccess = (location) => {
    console.log(
      '🚀 ~ file: useGeoLocation.js ~ line 13 ~ onSuccess ~ location',
      location
    );
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    console.log(
      '🚀 ~ file: useGeoLocation.js ~ line 27 ~ onError ~ error',
      error
    );
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeoLocation;
