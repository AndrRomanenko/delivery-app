import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import Carousel from '../../../../components/common/Carousel/Carousel';
import { COLORS, SIZES } from '../../../../constants/theme';
import { SessionContext } from '../../../../context/SessionContext';
import { RestaurantInfo } from './RestaurantInfo';
import TableUsersList from './TableUsersList';

const CategoryListHeader = ({ restaurant }) => {
  const { isInHouseSession, visit } = useContext(SessionContext);

  return (
    <>
      <View style={styles.carouselContainer}>
        <Carousel imageData={restaurant?.images} />
      </View>
      <RestaurantInfo restaurant={restaurant} />
      {isInHouseSession && <TableUsersList session={visit} />}
    </>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    height: SIZES.FOREGROUND.IMAGE_HEIGHT,
    width: '100%',
  },
  waiterText: {
    paddingLeft: SIZES.PADDING.P14,
    fontFamily: 'SFPRODISPLAY-SEMIBOLD',
    fontWeight: '600',
    color: COLORS.TEXT.BLACK,
    fontSize: SIZES.TEXT.BOLD,
  },
});

export default CategoryListHeader;
