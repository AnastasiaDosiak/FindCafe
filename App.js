/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, memo} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import SearchInput from './components/search-input/SearchInput';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import CafeMarker from './components/cafe-markers/CafeMarker';
import Carousel from 'react-native-snap-carousel';

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
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.latitude},${location.longitude}&radius=5000&types=food&key=AIzaSyAEdqz_mTq1OkqEQnFotJpF2QPI90TYjrc`,
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

  const renderPhoto = ({item}) => {
    return (
      <Image
        style={styles.image}
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=AIzaSyAEdqz_mTq1OkqEQnFotJpF2QPI90TYjrc`,
        }}
      />
    );
  };
  const sliderWidth = Dimensions.get('window').width;

  const closeActiveCafe = () => {
    setActiveCafe(null);
  };
  return (
    <>
      <View style={styles.body}>
        <SearchInput style={styles.input} onPickLocation={pickLocation} />
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            region={region}
            style={styles.map}
            maxZoomLevel={18}
            initialRegion={region}>
            {cafes.map((cafe, index) => (
              <CafeMarker key={index} cafe={cafe} onPress={handlePressCafe} />
            ))}
            <Marker coordinate={region} />
          </MapView>
          {activeCafe && (
            <View style={styles.cafeContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeActiveCafe}>
                <Text style={styles.closeIcon}>x</Text>
              </TouchableOpacity>
              <Text style={styles.cafeName}>{activeCafe.name}</Text>
              <Text style={styles.cafeRating}>Rating: {activeCafe.rating}</Text>
              <Carousel
                sliderWidth={sliderWidth}
                itemWidth={sliderWidth}
                contentContainerCustomStyle={styles.scroll}
                renderItem={renderPhoto}
                data={activeCafe.photos}
              />
            </View>
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
  closeButton: {
    width: '100%',
    backgroundColor: 'black',
  },
  closeIcon: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  scroll: {
    height: '65%',
    width: '100%',
  },
  mapContainer: {
    position: 'relative',
    height: '100%',
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
  },
  image: {
    height: '100%',
  },
  cafeContainer: {
    marginTop: '60%',
    backgroundColor: 'white',
    zIndex: 2,
    ...StyleSheet.absoluteFillObject,
  },
  cafeName: {
    marginBottom: 10,
    marginTop: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },
  cafeRating: {
    fontSize: 20,
    marginBottom: 15,
  },
});

export default memo(App);
