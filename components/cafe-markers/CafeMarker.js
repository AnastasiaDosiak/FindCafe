import React, {memo} from 'react';
import {Marker} from 'react-native-maps';

const CafeMarker = ({cafe, onPress}) => {
  console.log(onPress);

  const handlePress = () => {
    onPress(cafe);
  };
  const {location} = cafe.geometry;
  const {lat, lng} = location;

  return (
    <Marker
      title={cafe.name}
      coordinate={{latitude: lat, longitude: lng}}
      onPress={handlePress}
    />
  );
};

export default memo(CafeMarker);
