import React, {memo} from 'react';
import {Marker} from 'react-native-maps';

const CafeMarker = ({cafe, onPress}) => {
  const {location} = cafe.geometry;
  const {lat, lng} = location;
  const handlePress = () => {
    onPress(cafe);
  };

  return (
    <Marker
      coordinate={{latitude: lat, longitude: lng}}
      onPress={handlePress}
    />
  );
};

export default memo(CafeMarker);
