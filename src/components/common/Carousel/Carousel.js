import React, { useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import RestaurantHeaderImage from './RestaurantHeaderImage';

import useLanguageStyles from '../../../hooks/useLanguageStyles';

import { SCREEN_WIDTH } from '../../../constants/device';

const Carousel = ({ imageData }) => {
  const { languageStyles } = useLanguageStyles();

  const listRef = useRef(null);

  const [currentImage, setCurrentImage] = useState(0);

  const onScroll = event => {
    const totalWidth = event.nativeEvent.layoutMeasurement.width + 10;
    const xPos = event.nativeEvent.contentOffset.x;
    const current = Math.ceil(xPos / totalWidth);
    setCurrentImage(current);
  };

  const keyExtractor = useCallback((item, i) => {
    return item.src || i;
  }, []);

  const renderItem = ({ item }) => {
    return <RestaurantHeaderImage link={item?.src} />;
  };

  const renderDot = (dot, index) => (
    <View
      key={index}
      style={[
        styles.indicator,
        index === currentImage ? styles.activeIndicator : undefined,
      ]}
    />
  );

  if (imageData?.length === 1) {
    return <RestaurantHeaderImage link={imageData[0]?.src} />;
  }

  return (
    <View style={languageStyles.row}>
      <FlatList
        nestedScrollEnabled
        scrollEventThrottle={0}
        pagingEnabled
        horizontal={true}
        ref={listRef}
        showsHorizontalScrollIndicator={false}
        data={imageData?.length ? imageData : [{}]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={onScroll}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />

      {imageData?.length && (
        <View style={styles.indicatorContainer}>
          {imageData.map(renderDot)}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    top: SCREEN_WIDTH * 0.6153,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    bottom: 30,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 7.5,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    top: SCREEN_WIDTH * 0.1025,
  },
});

export default Carousel;
