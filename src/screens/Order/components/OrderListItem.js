import React from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

import { COLORS } from '../../../constants/theme';
import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { getValidPrice } from '../../../utils/order';
import { moderateScale } from '../../../utils/scale';

const DELETE_BUTTON_WIDTH = 80;

const OrderListItem = ({ item, editable, onDelete, index }) => {
  const { languageStyles, isReversed } = useLanguageStyles();
  const currencyPrice = getValidPrice(item.itemPrice);
  const { t: translation } = useTranslation('orderDetails');

  const wrapperRef = useRef();

  const renderSeparator = (i, items) => (
    <Text style={styles.text}>{i === items.length - 1 ? '.' : ','}</Text>
  );

  const renderSupplements = () => {
    if (!item.supplements?.length) {
      return null;
    }

    return (
      <View style={[styles.textContainer, languageStyles.row]}>
        <Text style={[styles.text, styles.topic]}>
          {translation('supplements')}:
        </Text>
        {item.supplements.map((s, i) => (
          <React.Fragment key={i}>
            <Text
              style={[
                styles.text,
                {
                  [isReversed ? 'marginRight' : 'marginLeft']: moderateScale(2),
                },
              ]}>
              {s.count} x {s.title}
            </Text>
            {renderSeparator(i, item.supplements)}
          </React.Fragment>
        ))}
      </View>
    );
  };

  const renderModifiers = () => {
    if (!item.options?.length) {
      return null;
    }

    return (
      <>
        {item.options.map((option, i) => (
          <Text key={i} style={[styles.text, languageStyles.text]}>
            <Text style={styles.topic}>{option.modifierTitle}</Text> :{' '}
            {option.optionTitle}
            {renderSeparator(i, item.options)}
          </Text>
        ))}
      </>
    );
  };

  const renderComment = () => {
    if (!item.comment) {
      return null;
    }
    return (
      <Text style={[styles.text, languageStyles.text]}>
        <Text style={[styles.topic]}>{translation('comment')}</Text>:{' '}
        {item.comment}
      </Text>
    );
  };

  const onDeleteItem = i => {
    onDelete(i);
    wrapperRef?.current?.close();
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={() => onDeleteItem(index)}
        activeOpacity={0.6}
        style={styles.deleteButton}>
        <Icon name="trash-o" size={28} color={COLORS.WHITE} />
      </TouchableOpacity>
    );
  };

  const Wrapper = editable ? Swipeable : View;

  return (
    <Wrapper
      ref={wrapperRef}
      renderRightActions={renderRightActions}
      rightOpenValue={moderateScale(-DELETE_BUTTON_WIDTH)}>
      <View style={[styles.container, languageStyles.row]}>
        <View style={styles.infoGroup}>
          <Text style={[styles.title, languageStyles.text]}>
            {item.product?.title}
          </Text>
          {renderSupplements()}
          {renderModifiers()}
          {renderComment()}
        </View>
        <View style={styles.divider} />
        <View style={styles.priceContainer}>
          <Text style={[styles.price, languageStyles.text]}>
            {currencyPrice}
          </Text>
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateScale(12),
    paddingBottom: moderateScale(12),
    borderBottomColor: COLORS.GRAY_LIGHT,
    borderBottomWidth: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: moderateScale(16),
  },
  infoGroup: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.BLACK,
    marginBottom: moderateScale(6),
  },
  price: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  divider: {
    flex: 0.05,
  },
  priceContainer: {},
  topic: {
    fontWeight: '600',
  },
  text: {
    fontSize: moderateScale(13),
    color: COLORS.GRAY_ICON,
    lineHeight: moderateScale(18),
  },
  textContainer: {
    flexWrap: 'wrap',
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(DELETE_BUTTON_WIDTH),
    backgroundColor: COLORS.BLUE,
  },
});

export default OrderListItem;
