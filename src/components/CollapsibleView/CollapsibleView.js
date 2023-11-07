import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { COLORS } from '../../constants/theme';
import useLanguageStyles from '../../hooks/useLanguageStyles';
import { moderateScale } from '../../utils/scale';
import IconButton from '../IconButton';

const CollapsibleView = ({ title, style, titleStyle, children }) => {
  const { languageStyles } = useLanguageStyles();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <TouchableOpacity
        onPress={onCollapse}
        style={[styles.collapseContainer, languageStyles.row, style]}>
        <Text style={[styles.title, languageStyles.text, titleStyle]}>
          {title}
        </Text>
        <IconButton
          name={`keyboard-arrow-${collapsed ? 'down' : 'up'}`}
          size={20}
        />
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>{children}</Collapsible>
    </>
  );
};

const styles = StyleSheet.create({
  collapseContainer: {
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: moderateScale(16),
    color: COLORS.BLACK,
    flex: 1,
  },
});

export default CollapsibleView;
