import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Image from '../../../../components/Image';
import { SCREEN_WIDTH } from '../../../../constants/device';
import { ROUTES } from '../../../../constants/navigator';
import { COLORS, SIZES } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';

const HORZIONTAL_SPACING = 16;
const ITEM_SPACING_BETWEEN = 13;

const CategoryListItem = ({ item, index }) => {
  const { languageStyles } = useLanguageStyles();
  const [image] = item.images;
  const navigation = useNavigation();
  const route = useRoute();

  const placement = index % 2 ? 'right' : 'left';
  const itemStyle = {
    marginLeft: placement === 'left' ? HORZIONTAL_SPACING : 0,
    marginRight:
      placement === 'right' ? HORZIONTAL_SPACING : ITEM_SPACING_BETWEEN,
  };

  const onOpenMenu = () => {
    navigation.navigate(ROUTES.RESTAURANT.CATEGORY_MENU, {
      categoryId: item.id,
      shop: route.params.restaurant,
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.65}
      key={item.id}
      onPress={onOpenMenu}
      style={[styles.container, itemStyle, styles.shadow]}>
      <Text style={[styles.title, languageStyles.text]}>{item.title}</Text>
      <Image
        source={{
          uri: image?.src,
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 13,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingBottom: 7,
    paddingTop: SIZES.PADDING.P15,
  },
  shadow: {
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 5,
  },
  title: {
    marginBottom: 10,
    fontSize: 15,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: SCREEN_WIDTH * 0.37948,
    borderRadius: 6,
  },
});

export default CategoryListItem;
