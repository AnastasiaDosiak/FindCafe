import React, {memo} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';

const LocationItem = ({
  fetchDetails,
  locationDetails: {place_id, description},
  onPress,
}) => {
  const handlePress = async () => {
    const res = await fetchDetails(place_id);
    onPress(res);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.text}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: 'grey',
  },
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    margin: 15,
    paddingBottom: 6,
  },
});

export default memo(LocationItem);
