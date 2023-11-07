import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/device';
import { COLORS, SIZES } from '../../../constants/theme';

// TODO: REFACTOR! (only demo now)

const CELL_COUNT = 6;

const CodeInput = incomingProps => {
  const [value, setValue] = useState(incomingProps.value);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleChange = v => {
    setValue(v);
    incomingProps.onChange(v);
  };

  return (
    <View style={styles.container}>
      <CodeField
        ref={ref}
        {...props}
        {...incomingProps}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={handleChange}
        cellCount={CELL_COUNT}
        rootStyle={styles.root}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            style={[styles.cell, isFocused && styles.focusedCell]}
            onLayout={getCellOnLayoutHandler(index)}
            key={index}>
            <Text style={styles.text}>{symbol || null}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SCREEN_HEIGHT * 0.04,
    width: '100%',
    alignItems: 'center',
  },
  root: {
    width: '100%',
  },
  cell: {
    width: SCREEN_WIDTH * 0.12,
    height: SCREEN_WIDTH * 0.12,
    backgroundColor: COLORS.GRAY,
    borderRadius: SIZES.BORDER_RADIUS.BR14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusedCell: {
    borderWidth: 1,
    borderColor: COLORS.BLUE,
  },
  text: {
    color: COLORS.TEXT.BLACK,
    fontSize: SCREEN_WIDTH * 0.06,
    textAlign: 'center',
  },
});

export default CodeInput;
