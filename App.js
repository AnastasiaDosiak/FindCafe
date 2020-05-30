/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect, memo} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import SearchInput from './components/search-input/SearchInput';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import CafeMarker from './components/cafe-markers/CafeMarker';
import CafeInfo from './components/cafe-info/CafeInfo';
import {API_KEY} from './components/consts';

const initialState = {
  latitude: 0,
  longitude: 0,
};
const App: () => React$Node = () => {
  const [region, setRegion] = useState(initialState);
  const [cafes, setCafes] = useState([]);
  const [activeCafe, setActiveCafe] = useState(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      if (response === 'granted') {
        locateCurrentPosition();
      }
    } else {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (response === 'granted') {
        locateCurrentPosition();
      }
    }
  };

  const locateCurrentPosition = () => {
    Geolocation.getCurrentPosition((position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setRegion(location);
      findNearbyCafe(location);
    });
  };

  const findNearbyCafe = (location) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=5000&types=cafe&key=${API_KEY}`,
    )
      .then((response) => response.json())
      .then((response) => setCafes(response.results));
  };

  const pickLocation = (locationDetails) => {
    const {
      geometry: {
        location: {lat, lng},
      },
    } = locationDetails;
    const location = {latitude: lat, longitude: lng};
    setRegion(location);
    findNearbyCafe(location);
  };

  const handlePressCafe = (cafe) => {
    setActiveCafe(cafe);
  };

  useEffect(() => {
    requestLocationPermission().then();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeActiveCafe = () => {
    setActiveCafe(null);
  };

  const setActiveCoordinates = () => {
    if (activeCafe !== null) {
      const cafeLocation = activeCafe.geometry.location;
      const coordinatesCafe = {
        latitude: cafeLocation.lat,
        longitude: cafeLocation.lng,
      };
      return coordinatesCafe;
    } else {
      return region;
    }
  };

  return (
    <>
      <View style={styles.body}>
        <SearchInput style={styles.input} onPickLocation={pickLocation} />
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            region={setActiveCoordinates()}
            style={activeCafe !== null ? styles.centerMap : styles.map}
            maxZoomLevel={17}
            initialRegion={setActiveCoordinates()}>
            {cafes.map((cafe, index) => (
              <CafeMarker key={index} cafe={cafe} onPress={handlePressCafe} />
            ))}
            <Marker
              coordinate={region}
              pinColor={'black'}
              title={'your current location'}
            />
          </MapView>
          {activeCafe && (
            <CafeInfo
              closeActiveCafe={closeActiveCafe}
              activeCafe={activeCafe}
            />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'whitesmoke',
    height: '100%',
  },
  centerMap: {
    height: '40%',
  },
  scroll: {
    height: '65%',
    width: '100%',
  },
  mapContainer: {
    position: 'relative',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  map: {
    height: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    zIndex: 1,
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    marginBottom: '60%',
  },
});

export default memo(App);
