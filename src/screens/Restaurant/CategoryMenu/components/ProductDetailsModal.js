import { useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Button from '../../../../components/common/Button';
import InputLabel from '../../../../components/common/InputLabel';
import IconButton from '../../../../components/IconButton';
import Image from '../../../../components/Image';
import TextInput from '../../../../components/input/TextInput';
import ModifiersTable from '../../../../components/ModifiersTable';
import { PeculiarityIcon } from '../../../../components/PeculiarityIcon';
import SupplementsTable from '../../../../components/SupplementsTable';
import { isIOS } from '../../../../constants/platform';
import { COLORS } from '../../../../constants/theme';
import { OrderContext } from '../../../../context/OrderContext';
import { SessionContext } from '../../../../context/SessionContext';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import usePrevious from '../../../../hooks/usePrevious';
import { useGetProductByIdQuery } from '../../../../services/productService';
import {
  getFormattedProductWeight,
  getValidPrice,
} from '../../../../utils/order';
import { moderateScale } from '../../../../utils/scale';

const ProductDetailsModal = ({ productId, onClose }) => {
  const { currentData = {}, isLoading } = useGetProductByIdQuery(productId, {
    skip: !productId,
    refetchOnMountOrArgChange: true,
  });

  const route = useRoute();
  const { addOrderItem, isOrderByShopAllowed } = useContext(OrderContext);
  const { isVisitActive, startSessionByShop } = useContext(SessionContext);

  const visible = !!productId;
  const prevVisible = usePrevious(visible);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const { t: translation } = useTranslation('productDetailsScreen');

  const mapSupplements = s => s.map(item => ({ ...item, quantity: 0 }));

  const [selectedSupplements, setSelectedSupplements] = useState([]);
  const [modifiersValues, setModifiersValues] = useState([]);

  const scrollViewRef = useRef();
  const [scrollOffset, setScrollOffset] = useState(0);

  const {
    title,
    description,
    price,
    images,
    peculiarities,
    modifiers,
    supplements,
    weight,
  } = currentData;

  useEffect(() => {
    if (!visible && visible !== prevVisible) {
      setSelectedSupplements([]);
      setModifiersValues([]);
      reset();
    }
  }, [visible, prevVisible]);

  useEffect(() => {
    if (!supplements) {
      return;
    }
    setSelectedSupplements(mapSupplements(supplements));
  }, [supplements]);

  useEffect(() => {
    if (!modifiers) {
      return;
    }
    const defaultOptionIndex = 0;
    const modValues = modifiers.map(m => {
      const selectedOption =
        m.options.find(x => x.isDefault) || m.options[defaultOptionIndex];
      return getModifierValueModel(m, selectedOption);
    });

    setModifiersValues(modValues);
  }, [modifiers]);

  const image = images?.[0];
  const { languageStyles, isReversed } = useLanguageStyles();

  const getModifierValueModel = (modifier, option) => {
    return {
      optionId: option.id,
      price: option.price,
      optionTitle: option.title,
      modifierId: modifier.id,
      modifierTitle: modifier.title,
    };
  };

  const onSupplementChange = item => {
    const s = [...selectedSupplements];
    const index = s.findIndex(x => x.id === item.id);
    s[index] = item;
    setSelectedSupplements(s);
  };

  const onModifierOptionSelect = (modifier, option) => {
    const index = modifiersValues.findIndex(m => m.modifierId === modifier.id);
    const m = [...modifiersValues];
    m[index] = getModifierValueModel(modifier, option);
    setModifiersValues(m);
  };

  const onScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const onScrollTo = p => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  const getTotalPrice = () => {
    const priceModifiers = [...selectedSupplements, ...modifiersValues];
    return priceModifiers.reduce(
      (acc, s) =>
        acc + (s.hasOwnProperty('quantity') ? s.quantity * s.price : s.price),
      price,
    );
  };

  const onAddToOrder = ({ comment = '' }) => {
    if (!isVisitActive) {
      onClose();
      return startSessionByShop(route.params.shop);
    }
    const item = {
      product: {
        productId,
        title,
        price,
        description,
        images,
      },
      comment,
      title,
      itemPrice: totalPrice,
      supplements: selectedSupplements
        .filter(s => s.quantity)
        .map(s => ({
          supplement: s.id,
          count: s.quantity,
          title: s.title,
        })),
      options: modifiersValues,
    };

    addOrderItem(item);
    onClose();
  };

  const totalPrice = useMemo(
    () => getTotalPrice(),
    [price, modifiers, selectedSupplements, modifiersValues],
  );
  const currencyPrice = getValidPrice(totalPrice);

  const addToOrderButtonVisible = isOrderByShopAllowed(route.params.shop);

  return (
    <Modal
      onBackdropPress={onClose}
      isVisible={visible}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      onBackButtonPress={onClose}
      useNativeDriverForBackdrop
      propagateSwipe={true}
      scrollTo={onScrollTo}
      scrollOffset={scrollOffset}
      // Test value
      scrollOffsetMax={250}
      style={styles.modal}>
      <KeyboardAvoidingView
        behavior={isIOS() ? 'padding' : 'height'}
        style={styles.contentContainer}>
        {isLoading || !currentData.id ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <IconButton
                style={styles.closeButton(isReversed)}
                name="close"
                color={COLORS.GRAY_DARK}
                size={18}
                onPress={onClose}
              />
              <Image source={{ uri: image?.src }} style={styles.image} />
              <View style={[styles.percContainer, languageStyles.row]}>
                {peculiarities?.map(p => (
                  <View key={p} style={styles.iconContainer}>
                    <PeculiarityIcon name={p} width="30" height="30" />
                  </View>
                ))}
              </View>
            </View>
            <ScrollView
              ref={scrollViewRef}
              onScroll={onScroll}
              scrollEventThrottle={16}>
              <View style={styles.infoContainer}>
                <View style={styles.titleWrapper}>
                  <Text style={[styles.title, languageStyles.text]}>
                    {title}
                  </Text>
                  <Text style={styles.price}>{currencyPrice}</Text>
                </View>

                <Text style={[styles.description, languageStyles.text]}>
                  {description}
                </Text>
                {weight && (
                  <Text style={[styles.weight, languageStyles.text]}>
                    {getFormattedProductWeight(weight)}
                  </Text>
                )}
              </View>
              <View
                style={styles.actions(
                  modifiers?.length || selectedSupplements?.length,
                )}>
                <ModifiersTable
                  modifiers={modifiers}
                  values={modifiersValues}
                  onModifierOptionSelect={onModifierOptionSelect}
                />
                <SupplementsTable
                  onItemChange={onSupplementChange}
                  supplements={selectedSupplements}
                />
                <View style={styles.commentContainer}>
                  <InputLabel label={translation('addComment')} />
                  <Controller
                    control={control}
                    name="comment"
                    render={({ field: { onChange, value, onBlur } }) => (
                      <TextInput
                        inputStyle={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        error={errors?.comment?.message}
                      />
                    )}
                  />
                </View>
                <Button
                  style={styles.submitButton}
                  disabled={!addToOrderButtonVisible}
                  onPress={handleSubmit(onAddToOrder)}
                  label={`${translation('addToOrder')} ${currencyPrice}`}
                  secondary={!isValid}
                />
              </View>
            </ScrollView>
          </>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentContainer: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    minHeight: '55%',
    maxHeight: isIOS() ? '88%' : '92%',
    backgroundColor: COLORS.WHITE,
    paddingBottom: moderateScale(46),
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: moderateScale(200),
    width: '100%',
  },
  image: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: '100%',
    height: '100%',
  },
  content: {
    marginVertical: moderateScale(20),
  },
  percContainer: {
    position: 'absolute',
    bottom: moderateScale(17),
    paddingHorizontal: moderateScale(11),
    width: '100%',
  },
  iconContainer: {
    marginHorizontal: moderateScale(6),
  },
  infoContainer: {
    paddingHorizontal: moderateScale(16),
    marginTop: moderateScale(20),
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  price: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  description: {
    fontWeight: '400',
    color: COLORS.GRAY_ICON,
    lineHeight: moderateScale(22),
    marginTop: moderateScale(12),
  },
  weight: {
    marginTop: moderateScale(10),
    color: COLORS.BLACK,
    fontSize: moderateScale(13),
    fontWeight: '500',
  },
  closeButton: reversed => ({
    borderRadius: moderateScale(28),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    position: 'absolute',
    width: moderateScale(28),
    height: moderateScale(28),
    alignItems: 'center',
    justifyContent: 'center',
    top: moderateScale(12),
    zIndex: 5,
    [reversed ? 'left' : 'right']: moderateScale(12),
  }),
  actions: exists => ({
    borderTopColor: COLORS.GRAY_LIGHT,
    borderTopWidth: exists ? 1 : 0,
    marginTop: moderateScale(20),
  }),
  commentContainer: {
    marginTop: moderateScale(28),
    paddingHorizontal: moderateScale(16),
  },
  input: {
    height: moderateScale(68),
  },
  submitButton: {
    marginTop: moderateScale(20),
    width: 'auto',
    marginHorizontal: moderateScale(16),
  },
});

export default ProductDetailsModal;
