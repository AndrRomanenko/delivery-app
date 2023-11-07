import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { SCREEN_WIDTH } from '../../../constants/device';
import Image from '../../Image';

const RestaurantHeaderImage = ({ link }) => {
  const menu = useMemo(() => {
    return (
      <View key={link} style={{ width: '100%', height: '100%' }}>
        <Image
          source={{
            uri: link,
          }}
          resizeMode={'stretch'}
          style={styles.image}
        />
      </View>
    );
  }, [link]);

  return <View style={styles.container}>{menu}</View>;
};

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: '100%',
    marginBottom: 7,
  },
});

export default RestaurantHeaderImage;
