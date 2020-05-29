import React, {memo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CafeInfo = ({activeCafe, closeActiveCafe}) => {
  const sliderWidth = Dimensions.get('window').width;
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

  return (
    <View style={styles.cafeContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={closeActiveCafe}>
        <Image
          style={styles.closeIcon}
          source={require('../images/trash.png')}
        />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.cafeName}>
        {activeCafe.name}
      </Text>
      <Text numberOfLines={1} style={styles.cafeRating}>
        Rating: {activeCafe.rating}
      </Text>
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth}
        contentContainerCustomStyle={styles.scroll}
        renderItem={renderPhoto}
        data={activeCafe.photos}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cafeContainer: {
    marginTop: '60%',
    backgroundColor: 'white',
    zIndex: 2,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    margin: 15,
    paddingBottom: 6,
  },
  closeButton: {
    width: '100%',
    backgroundColor: 'darkgrey',
    padding: 4,
  },
  closeIcon: {
    marginTop: 0,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
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
  image: {
    height: '70%',
    resizeMode: 'cover',
  },
});

export default memo(CafeInfo);
