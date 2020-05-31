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
import {API_KEY} from '../consts';

const CafeInfo = ({activeCafe, closeActiveCafe}) => {
  const sliderWidth = Dimensions.get('window').width;
  const renderPhoto = ({item}) => {
    const imageSrc = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photo_reference}&key=${API_KEY}`;
    return (
      <Image
        style={styles.image}
        source={{
          uri: imageSrc,
        }}
      />
    );
  };

  return (
    <View style={styles.cafeContainer}>
      <View style={styles.cafeInfo}>
        <View style={styles.cafeDetails}>
          <Text numberOfLines={1} style={styles.cafeName}>
            {activeCafe.name}
          </Text>
          <Text numberOfLines={1} style={styles.cafeRating}>
            Rating: {activeCafe.rating}
          </Text>
        </View>
        <TouchableOpacity onPress={closeActiveCafe}>
          <Image source={require('../images/close.png')} />
        </TouchableOpacity>
      </View>
      {activeCafe.photos && activeCafe.photos.length > 0 && (
        <Carousel
          sliderWidth={sliderWidth}
          itemWidth={sliderWidth}
          contentContainerCustomStyle={styles.scroll}
          renderItem={renderPhoto}
          data={activeCafe.photos}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cafeContainer: {
    marginTop: '60%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'grey',
    zIndex: 2,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    margin: 15,
    paddingBottom: 6,
  },
  cafeInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
  cafeDetails: {
    maxWidth: '90%',
  },
  cafeName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  cafeRating: {
    fontSize: 20,
  },
  image: {
    height: '70%',
    resizeMode: 'cover',
  },
});

export default memo(CafeInfo);
