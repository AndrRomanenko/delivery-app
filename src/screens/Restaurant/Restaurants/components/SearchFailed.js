import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SIZES } from '../../../../constants/theme';
import SearchFailed from '../../../../icons/listIcon/SearchFailed.svg';

const SearchFailedComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.h1}>Ooops, no result found</Text>
        <Text style={styles.h2}>Try removing some of your keywords</Text>
        <Text style={styles.h3}> to see more results</Text>
      </View>
      <View style={styles.image}>
        <SearchFailed />
      </View>
    </View>
  );
};

export default SearchFailedComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    marginTop: 20,
  },
  h1: {
    fontFamily: 'SFPRODISPLAY-MEDIUM',
    fontWeight: '500',
    fontSize: SIZES.TEXT.BOLD,
    color: 'black',
    textAlign: 'center',
  },
  h2: {
    fontFamily: 'SFPRODISPLAY-Regular',
    fontWeight: '500',
    fontSize: SIZES.TEXT.MEDIUM,
    textAlign: 'center',
    color: '#9898AF',
    marginTop: 10,
  },
  h3: {
    fontFamily: 'SFPRODISPLAY-Regular',
    fontWeight: '500',
    fontSize: SIZES.TEXT.MEDIUM,
    textAlign: 'center',
    color: '#9898AF',
    marginTop: 3,
  },
  image: {
    marginTop: 40,
  },
});
