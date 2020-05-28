import React, {useState, createRef} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import DelayInput from 'react-native-debounce-input';

const SearchComponent = () => {
  const [value] = useState('');
  const inputRef = createRef();

  return (
    <SafeAreaView>
      <DelayInput
        value={value}
        minLength={3}
        inputRef={inputRef}
        delayTimeout={500}
        style={styles.input}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
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
});

export default SearchComponent;
