import React from 'react';
import { StyleSheet, View } from 'react-native';
import ModifierItem from './ModifierItem';

const ModifiersTable = ({
  style,
  modifiers,
  values,
  onModifierOptionSelect,
}) => {
  if (!modifiers || !modifiers.length || !values || !values.length) {
    return null;
  }

  const getModifierValue = m => {
    return values.find(v => v.modifierId === m.id)?.optionId;
  };

  return (
    <View style={[styles.container, style]}>
      {modifiers.map(m => (
        <ModifierItem
          key={m.id}
          item={m}
          value={getModifierValue(m)}
          onItemOptionSelect={onModifierOptionSelect}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ModifiersTable;
