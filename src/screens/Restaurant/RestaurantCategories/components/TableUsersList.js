import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import Avatar from '../../../../components/Avatar';
import { SCREEN_WIDTH } from '../../../../constants/device';
import { COLORS, SIZES } from '../../../../constants/theme';
import useLanguageStyles from '../../../../hooks/useLanguageStyles';
import { moderateScale } from '../../../../utils/scale';

const TableUsersList = ({ session }) => {
  const { languageStyles } = useLanguageStyles();
  const { t: translation } = useTranslation('restaurantScreen');

  const users = useMemo(
    () =>
      session.guests ? [session.owner, ...session.guests] : [session.owner],
    [session],
  );

  const renderUserAvatars = () => {
    return users.map((user, index) => (
      <Avatar key={index} style={styles.imageContainer} src={user.photo} />
    ));
  };

  return (
    <View style={[styles.container, languageStyles.row]}>
      <Text style={styles.text}>
        {translation('tables')} {session.tableName || session.tableId}
      </Text>
      <View style={[styles.userContainer, languageStyles.row]}>
        {renderUserAvatars()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: COLORS.GRAY,
    borderBottomWidth: 1,
    marginBottom: SIZES.MARGIN.M15,
    paddingHorizontal: SIZES.PADDING.P15,
    paddingVertical: moderateScale(5),
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH * 0.07692,
    height: SCREEN_WIDTH * 0.07692,
    borderRadius: SIZES.BORDER_RADIUS.BR50,
  },
  textContainer: {
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    fontSize: SIZES.TEXT.LARGE,
    color: COLORS.TEXT.BLACK,
    fontFamily: 'SFPRODISPLAY-SEMIBOLD',
  },
  userContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: SIZES.PADDING.P16,
    marginLeft: 10,
  },
  imageContainer: {
    width: moderateScale(34),
    height: moderateScale(34),
    borderRadius: SIZES.BORDER_RADIUS.BR50,
    backgroundColor: COLORS.APP_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
});

export default TableUsersList;
