import dayjs from 'dayjs';
import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { SCREEN_WIDTH } from '../../constants/device';
import { COLORS, FONTS } from '../../constants/theme';
import { moderateScale } from '../../utils/scale';

/**
 * Horizontal scrollable calendar.
 * As we are using it in single place => only required props/functional presented.
 */
const CalendarHorizontal = ({ onChange, value }) => {
  const handleTimeChange = newDate => {
    const { year, month, day, dateString } = newDate;
    if (value && !dayjs(dateString).isBefore(dayjs(), 'date')) {
      // To return with previously selected time.
      const date = dayjs(value)
        .set('year', year)
        .set('month', month - 1)
        .set('date', day)
        .toDate();
      onChange(date);
    }
    if (!value) {
      onChange(dayjs(dateString).toDate());
    }
  };

  return (
    <CalendarList
      pastScrollRange={0}
      futureScrollRange={3}
      horizontal
      pagingEnabled
      calendarWidth={SCREEN_WIDTH - moderateScale(28)}
      markingType={'period'}
      onDayPress={onChange && handleTimeChange}
      markedDates={
        value && {
          [dayjs(value).format('YYYY-MM-DD')]: {
            color: COLORS.BLUE,
            textColor: COLORS.WHITE,
            startingDay: true,
            endingDay: true,
          },
        }
      }
      theme={{
        todayTextColor: COLORS.TEXT.BLACK,
        dayTextColor: COLORS.TEXT.BLACK,
        textDisabledColor: COLORS.GRAY_ICON,
        textSectionTitleColor: COLORS.GRAY_ICON,
        monthTextColor: COLORS.TEXT.BLACK,
        textDayHeaderFontWeight: '400',
        textDayFontFamily: FONTS.MEDIUM,
        textMonthFontFamily: FONTS.MEDIUM,
        textDayHeaderFontFamily: FONTS.MEDIUM,
        textDayFontSize: moderateScale(14),
        textMonthFontSize: moderateScale(16),
        textDayHeaderFontSize: moderateScale(14),
        'stylesheet.calendar-list.main': {
          calendar: {
            paddingHorizontal: 0,
            paddingLeft: 0,
          },
        },
        'stylesheet.day.period': {
          base: {
            width: moderateScale(36),
            height: moderateScale(36),
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
      }}
    />
  );
};

export default CalendarHorizontal;
