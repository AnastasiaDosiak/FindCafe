import React, {useState, useRef, memo} from 'react';
import {StyleSheet, ScrollView, View, TextInput, Platform} from 'react-native';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import LocationItem from './location-item/LocationItem';
import {API_KEY} from '../consts';

const SearchComponent = ({onPickLocation, onFocus}) => {
  const [showAutoComplete, setShowAutoComplete] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const handlePressAutoComplete = (details) => {
    inputRef.current.blur();
    setShowAutoComplete(false);
    onPickLocation(details);
    setInputValue(details.formatted_address);
  };
  const handleFocus = () => {
    onFocus();
    setShowAutoComplete(true);
  };

  return (
    <View style={styles.searchContainer}>
      <GoogleAutoComplete apiKey={API_KEY} debounce={300}>
        {({handleTextChange, locationResults, fetchDetails}) => (
          <>
            <TextInput
              placeholder="Search places"
              ref={inputRef}
              value={inputValue}
              onChangeText={(text) => {
                setInputValue(text);
                handleTextChange(text);
              }}
              style={styles.input}
              onFocus={handleFocus}
              clearButtonMode={'while-editing'}
            />
            {showAutoComplete && inputValue.length > 0 && (
              <ScrollView keyboardShouldPersistTaps="handled">
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
    marginTop: Platform.OS === 'ios' ? 45 : 15,
    paddingLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.65,
    elevation: 6,
    margin: 10,
    backgroundColor: 'white',
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
});

export default memo(SearchComponent);
