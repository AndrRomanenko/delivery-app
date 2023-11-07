import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Image from '../../../../components/Image';
import { PeculiarityIcon } from '../../../../components/PeculiarityIcon';
import { COLORS } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { getValidPrice } from '../../../../utils/order';

const maxImageIconLength = 3;

const ProductListItem = ({ item, index, onPress }) => {
  const [image] = item.images;
  const { languageStyles } = useLanguageStyles();
  const currencyPrice = getValidPrice(item.price);

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={0.65}
      style={[styles.container, index && styles.border]}>
      <View style={styles.textGroup}>
        <Text style={[styles.title, languageStyles.text]}>{item.title}</Text>
        <Text style={[styles.description, languageStyles.text]}>
          {item.description}
        </Text>
        <Text style={[styles.price, languageStyles.text]}>{currencyPrice}</Text>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.peculiaritiesContainer}>
          {item.peculiarities.slice(0, maxImageIconLength).map(p => (
            <View key={p} style={styles.iconContainer}>
              <PeculiarityIcon name={p} width="20" height="20" />
            </View>
          ))}
        </View>

        <Image source={{ uri: image?.src }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  border: {
    borderTopColor: COLORS.GRAY_LIGHT,
    borderTopWidth: 1,
  },
  textGroup: {
    flex: 1,
    marginRight: 19,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    fontFamily: 'SFPRODISPLAY-SEMIBOLD',
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'SFPRODISPLAY-REGULAR',
    color: COLORS.GRAY_ICON,
    marginTop: 8,
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.BLUE,
    fontFamily: 'SFPRODISPLAY-SEMIBOLD',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 6,
  },
  peculiaritiesContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    right: -8,
    height: '100%',
  },
  iconContainer: {
    padding: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
    marginTop: 2,
  },
});

export default ProductListItem;
