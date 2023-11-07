import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Button from '../../../components/common/Button';
import InfoModal from '../../../components/InfoModal';
import RatingStars from '../../../components/RatingStars';
import { COLORS } from '../../../constants/theme';
import useLanguageStyles from '../../../hooks/useLanguageStyles';
import { moderateScale } from '../../../utils/scale';
import TextInput from '../../../components/input/TextInput';
import { Controller, useForm } from 'react-hook-form';
import { requiredValidation } from '../../../utils/validations';
import { SCREEN_HEIGHT } from '../../../constants/device';
import { useSendShopReviewMutation } from '../../../services/ordersService';
import { TOAST_TYPES } from '../../../constants/toasts';
import { getFormattedErrorMessage } from '../../../utils/error';

const FeedbackModal = ({ route }) => {
  const { t: translation } = useTranslation('modals', {
    keyPrefix: 'feedbackModal',
  });
  const { languageStyles } = useLanguageStyles();
  const navigation = useNavigation();
  const toast = useToast();
  const {
    restaurant: { title },
    orderId,
    onSubmit,
  } = route.params;

  const [sendReview, { isLoading }] = useSendShopReviewMutation();

  const [rank, setRank] = useState(0);
  const [rankSubmitted, setRankSubmitted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });

  const onCancel = () => {
    if (rankSubmitted) {
      onReviewSubmit();
      return;
    }
    navigation.goBack();
  };

  const onRankSubmit = () => {
    setRankSubmitted(true);
  };

  const onReviewSubmit = async data => {
    try {
      await sendReview({
        orderId,
        review: {
          rating: rank,
          message: data?.comment,
        },
      }).unwrap();
      onSubmit?.();
      toast.show('Your review was placed', { type: TOAST_TYPES.SUCCESS });
    } catch (error) {
      console.warn('Review placing error', error);
      const formattedMsg = getFormattedErrorMessage(error);
      toast.show(formattedMsg);
    } finally {
      navigation.goBack();
    }
  };

  return (
    <InfoModal onOutPress={onCancel}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {rankSubmitted
              ? translation('titleMessage')
              : `${translation('titleRank')} ${title}`}
          </Text>
          <Text style={styles.description}>
            {rankSubmitted
              ? translation('infoMessage')
              : translation('infoRank')}
          </Text>
        </View>
        {rankSubmitted ? (
          <Controller
            control={control}
            name="comment"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors?.comment?.message}
                multiline
                inputStyle={styles.commentInput}
              />
            )}
            rules={requiredValidation}
          />
        ) : (
          <RatingStars
            value={rank}
            onChange={setRank}
            size={moderateScale(25)}
            starContainerStyle={styles.ratingStars}
          />
        )}

        <View style={[styles.buttonContainer, languageStyles.row]}>
          <Button
            style={styles.button}
            label={translation('buttonCancel')}
            onPress={onCancel}
            secondary
          />
          <Button
            style={styles.button}
            label={translation('buttonSubmit')}
            onPress={
              rankSubmitted ? handleSubmit(onReviewSubmit) : onRankSubmit
            }
            disabled={!rank || errors?.comment}
            loading={isLoading}
          />
        </View>
      </View>
    </InfoModal>
  );
};

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    paddingHorizontal: moderateScale(53),
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: moderateScale(16),
    color: COLORS.TEXT.BLACK,
  },
  description: {
    textAlign: 'center',
    marginTop: moderateScale(10),
    fontWeight: '500',
    fontSize: moderateScale(14),
    color: COLORS.GRAY_ICON,
  },
  buttonContainer: {
    paddingHorizontal: moderateScale(16),
    borderTopWidth: 1,
    borderColor: COLORS.GRAY,
    marginTop: moderateScale(24),
    paddingTop: moderateScale(17),
  },
  button: {
    flex: 1,
    marginHorizontal: moderateScale(6),
    marginBottom: 0,
  },
  loadingContainer: {
    marginTop: moderateScale(22),
  },
  ratingStars: {
    width: '60%',
    justifyContent: 'space-between',
    marginTop: moderateScale(28),
    marginBottom: moderateScale(10),
  },
  commentInput: {
    alignSelf: 'center',
    width: '90%',
    minHeight: moderateScale(115),
    maxHeight: moderateScale(SCREEN_HEIGHT * 0.2),
    marginTop: moderateScale(20),
  },
});

export default FeedbackModal;
