/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import SearchInput from './components/search-input/SearchInput';

const initialState = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};
const App: () => React$Node = () => {
  const [region] = useState(initialState);
  // useEffect(
  //   () =>
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     }),
  //   [],
  // );

  // currentPosition = () => {
  //   Geolocation.setRNConfiguration((position) =>
  //     console.log(JSON.stringify(position)),
  //   );
  // };

  return (
    <>
      <View style={styles.body}>
        {/*<Button onPressed={this.currentPosition} />*/}
        <SearchInput style={styles.input} />
        <MapView
          provider={PROVIDER_GOOGLE}
          region={region}
          // onRegionChange={onRegionChange}
          style={styles.map}
          initialRegion={region}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'whitesmoke',
    height: '100%',
  },
  map: {
    marginTop: 80,
    height: '100%',
    ...StyleSheet.absoluteFillObject,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  input: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default App;
