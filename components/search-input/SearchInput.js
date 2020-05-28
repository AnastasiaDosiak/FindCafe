import React, {useState, memo} from 'react';
import {StyleSheet, ScrollView, View, TextInput} from 'react-native';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import LocationItem from './location-item/LocationItem';

const SearchComponent = ({onPickLocation}) => {
  const [showAutoComplete, setShowAutoComplete] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const handlePressAutoComplete = (details) => {
    setShowAutoComplete(false);
    onPickLocation(details);
    setInputValue(details.formatted_address);
  };
  const handleStartEditing = () => {
    setShowAutoComplete(true);
  };
  return (
    <View style={styles.searchContainer}>
      <GoogleAutoComplete
        apiKey={'AIzaSyAEdqz_mTq1OkqEQnFotJpF2QPI90TYjrc'}
        debounce={500}>
        {({handleTextChange, locationResults, fetchDetails}) => (
          <>
            <TextInput
              placeholder="Search places"
              value={inputValue}
              onChangeText={(text) => {
                setInputValue(text);
                handleTextChange(text);
              }}
              style={styles.input}
              onFocus={handleStartEditing}
              clearButtonMode={'while-editing'}
            />
            {showAutoComplete && inputValue.length > 0 && (
              <ScrollView>
                {locationResults.map((element) => (
                  <LocationItem
                    locationDetails={element}
                    key={element.id}
                    onPress={handlePressAutoComplete}
                    fetchDetails={fetchDetails}
                  />
                ))}
              </ScrollView>
            )}
          </>
        )}
      </GoogleAutoComplete>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 60,
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    margin: 10,
    backgroundColor: 'white',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  searchContainer: {
    maxHeight: '35%',
  },
});

export default memo(SearchComponent);
