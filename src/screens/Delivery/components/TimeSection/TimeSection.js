import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Divider from '../../../../components/common/Divider';
import RadioButtonGroup from '../../../../components/RadioButtonGroup';
import { ORDER_PICKUP_TIME_TYPES } from '../../../../constants/order';
import { COLORS } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { setOrderDeliveryTime } from '../../../../store/reducers/orderSlice';
import { moderateScale } from '../../../../utils/scale';
import { dateFormatter } from '../../../../utils/dateFormatter';
import CalendarHorizontal from '../../../../components/CalendarHorizontal';

const TimeSection = ({ scrollRef }) => {
  const dispatch = useDispatch();
  const { languageStyles } = useLanguageStyles();
  const { t: translation } = useTranslation('deliveryDetailsScreen');
  const [selectedTimeType, setSelectedTimeType] = useState(undefined);
  const [isDateSelection, setDateSelection] = useState(false);

  const minTime = dayjs().add(1, 'hour').add(5, 'minutes').toDate();

  const [selectedTime, setSelectedTime] = useState(minTime);

  const isParticulartime =
    selectedTimeType?.type === ORDER_PICKUP_TIME_TYPES.PARTICULAR;

  useEffect(() => {
    setSelectedTimeType({ id: 0 });
    dispatch(setOrderDeliveryTime(dayjs(minTime).toISOString()));
  }, []);

  const handleLayoutScroll = e => {
    scrollRef.current.scrollToEnd();
  };

  useEffect(() => {
    setSelectedTime(minTime);
  }, [selectedTimeType]);

  const handleTimeTypeSelect = data => {
    setSelectedTimeType(data);
  };

  const handlePickupTimeSelect = date => {
    setSelectedTime(date);
    dispatch(setOrderDeliveryTime(dayjs(date).toISOString()));
  };

  return (
    <>
      <Text style={[styles.title, languageStyles.text]}>
        {translation('selectTime')}
      </Text>
      <RadioButtonGroup
        activeIndex={selectedTimeType?.id}
        onItemSelect={handleTimeTypeSelect}
        items={Object.values(ORDER_PICKUP_TIME_TYPES).map((type, index) => ({
          item: { type, id: index },
          title: <Text style={styles.optionLabel}>{translation(type)}</Text>,
        }))}
        itemStyle={languageStyles.rowReverse}
      />
      {isParticulartime && (
        <>
          {/* Full date info block */}
          <Divider fullWidth />
          <View style={[styles.dateInfo, languageStyles.row]}>
            <Icon
              name="access-time"
              size={moderateScale(26)}
              color={COLORS.GRAY_DARK}
            />
            <TouchableOpacity
              style={styles.timeButton}
              onPress={() => setDateSelection(true)}>
              <Text style={styles.optionLabel}>
                {dateFormatter.format(selectedTime)}
              </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={() => setDateSelection(false)}>
              <Text style={styles.optionLabel}>
                {dayjs(selectedTime).format('H:mm')}
              </Text>
            </TouchableOpacity>
          </View>
          <Divider fullWidth />

          {/* Date/Time pickers */}
          <View style={styles.pickerContainer}>
            {isDateSelection ? (
              <View onLayout={handleLayoutScroll}>
                <CalendarHorizontal
                  value={selectedTime}
                  onChange={handlePickupTimeSelect}
                />
              </View>
            ) : (
              <View onLayout={handleLayoutScroll}>
                <DatePicker
                  mode="time"
                  date={selectedTime}
                  onDateChange={handlePickupTimeSelect}
                  textColor={COLORS.TEXT.BLACK}
                  androidVariant="iosClone"
                  minimumDate={minTime}
                />
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.TEXT.BLACK,
    marginTop: moderateScale(20),
    marginBottom: moderateScale(12),
  },
  info: {
    fontSize: moderateScale(12),
    fontWeight: '400',
    color: COLORS.GRAY_ICON,
    marginBottom: moderateScale(12),
  },
  optionLabel: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: COLORS.TEXT.BLACK,
    flex: 1,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(11),
  },
  dateInfo: {
    alignItems: 'center',
  },
  pickerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: moderateScale(90),
  },
  divider: {
    flex: 1,
  },
});

export default TimeSection;
