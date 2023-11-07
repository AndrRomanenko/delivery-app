import React, { useState } from 'react';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import ErrorText from '../../common/ErrorText';

import useLanguageStyles from '../../../hooks/useLanguageStyles';

import { dateFormatter } from '../../../utils/dateFormatter';
import { COLORS, SIZES } from '../../../constants/theme';

// BE validates dates more than 2 days ago
const MAX_DATE = dayjs().subtract(2, 'days').toDate();
const MIN_DATE = new Date('1950-01-01');

const DateInput = ({ value, onChange, error }) => {
  const [open, setOpen] = useState(false);
  const { languageStyles } = useLanguageStyles();

  const currentValue = value ? dateFormatter.format(new Date(value)) : '';

  const handleConfirm = date => {
    setOpen(false);
    const dateAsFormattedString = dateFormatter.format(new Date(date));
    onChange(dateAsFormattedString);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        activeOpacity={1}
        style={[styles.root, error && styles.error]}>
        <Text style={[styles.text, languageStyles.text]}>{currentValue}</Text>
      </TouchableOpacity>
      <ErrorText error={error} />
      <DatePicker
        textColor={COLORS.TEXT.BLACK}
        minimumDate={MIN_DATE}
        maximumDate={MAX_DATE}
        modal
        open={open}
        date={value ? new Date(value) : MAX_DATE}
        mode="date"
        theme="light"
        onConfirm={handleConfirm}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingVertical: SIZES.INPUT.PADDING.VERTICAL,
    paddingHorizontal: SIZES.INPUT.PADDING.HORIZONTAL,
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: SIZES.BORDER_RADIUS.BR14,
    fontSize: SIZES.TEXT.REGULAR,
    fontWeight: '400',
    color: COLORS.TEXT.BLACK,
    borderWidth: 1,
    borderColor: COLORS.GRAY_LIGHT,
  },
  error: {
    borderColor: COLORS.ORANGE,
  },
  container: {
    paddingHorizontal: SIZES.PADDING.P20,
    marginTop: SIZES.MARGIN.M20,
  },
  input: {
    backgroundColor: COLORS.GRAY_LIGHT,
    paddingVertical: SIZES.PADDING.P12,
    paddingLeft: SIZES.PADDING.P16,
    borderRadius: SIZES.BORDER_RADIUS.BR12,
  },
  text: {
    fontFamily: 'SFPRODISPLAY-REGULAR',
    fontWeight: '400',
    fontSize: SIZES.TEXT.REGULAR,
    color: COLORS.TEXT.BLACK,
  },
});

export default DateInput;
