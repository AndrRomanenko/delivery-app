import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text } from 'react-native';

import Button from '../../../components/common/Button';
import CallAWaiter from '../../../components/common/CallAWaiter/CallAWaiter';
import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';

import useLanguageStyles from '../../../hooks/useLanguageStyles';

import Divider from '../../../components/common/Divider';
import InputLabel from '../../../components/common/InputLabel';
import TextInput from '../../../components/input/TextInput';
import RadioButtonGroup from '../../../components/RadioButtonGroup';
import { ROUTES } from '../../../constants/navigator';
import { COLORS } from '../../../constants/theme';
import { getValidPrice, validatePrice } from '../../../utils/order';
import { moderateScale } from '../../../utils/scale';

/**
 * TODO: UI implememntation only.
 * Implement rest in future
 */
const Tips = ({ navigation, route }) => {
  const { t: translation } = useTranslation('tipsScreen');
  const { languageStyles } = useLanguageStyles();
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(3);
  const [selectedOptionValue, setSelectedOptionValue] = useState(0);
  // Need this only to handle custom tips
  const [selectedOptionPercentage, setSelectedOptionPercentage] = useState(0);

  const { totalPrice, session, selectedOrderIds } = route.params;

  const onSubmit = () => {
    navigation.navigate(ROUTES.ORDERS.PAYMENT.INVOICE, {
      tips: Number(selectedOptionValue),
      totalPrice,
      session,
      selectedOrderIds,
    });
  };

  const onItemSelect = (option, index) => {
    setSelectedOptionIndex(index);
    setSelectedOptionPercentage(0);
    setSelectedOptionValue(
      selectedOptionIndex !== 2 ? getSumFromPercent(option.value) : 0,
    );
  };

  const getSumFromPercent = percent => {
    return validatePrice((totalPrice / 100) * percent);
  };

  const options = [
    {
      title: `${translation('add')} 5% (${getValidPrice(
        getSumFromPercent(5),
      )})`,
      value: 5,
    },
    {
      title: `${translation('add')} 10% (${getValidPrice(
        getSumFromPercent(10),
      )})`,
      value: 10,
    },
    {
      title: translation('addAnother'),
      value: 0,
    },
    {
      title: translation('noThanks'),
      value: 0,
    },
  ];

  const handleCustomSumChange = sum => {
    setSelectedOptionValue(sum);
    setSelectedOptionPercentage((100 / (totalPrice / sum)).toFixed(1));
  };

  const handleCustomPercentChange = percent => {
    setSelectedOptionValue(getSumFromPercent(percent));
    setSelectedOptionPercentage(percent);
  };

  const getResultPrice = () => {
    return getValidPrice(totalPrice + Number(selectedOptionValue));
  };

  return (
    <PageContainer
      header={
        <PageHeader
          title={translation('pageTitle')}
          rightButton={<CallAWaiter />}
        />
      }>
      <Text style={[styles.title, languageStyles.text]}>
        {translation('info')}
      </Text>
      <RadioButtonGroup
        activeIndex={selectedOptionIndex}
        onItemSelect={onItemSelect}
        items={options.map((option, index) => ({
          item: { ...option, id: index },
          title: <Text style={styles.tipLabel}>{option.title}</Text>,
          info:
            index === 2 && selectedOptionIndex === 2 ? (
              <>
                <Divider />
                <InputLabel label={translation('tipsSum')} />
                <TextInput
                  inputStyle={styles.input}
                  value={String(selectedOptionValue)}
                  keyboardType="number-pad"
                  onChangeText={handleCustomSumChange}
                />
                <InputLabel label={translation('tipsPercent')} />
                <TextInput
                  inputStyle={styles.input}
                  keyboardType="number-pad"
                  value={String(selectedOptionPercentage)}
                  onChangeText={handleCustomPercentChange}
                />
                <Divider />
              </>
            ) : null,
        }))}
        itemStyle={styles.radioItem}
      />
      <Button
        onPress={onSubmit}
        style={styles.selectButton}
        label={`${translation('addTips')} ${getResultPrice()}`}
      />
    </PageContainer>
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
  selectButton: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: '5%',
  },
  totalContainer: {
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  total: {
    fontSize: moderateScale(16),
    fontWeight: '700',
  },
  radioItem: {
    paddingVertical: moderateScale(10),
  },
  tipLabel: {
    fontSize: moderateScale(16),
    fontWeight: '400',
    color: COLORS.TEXT.BLACK,
    flex: 1,
  },
  input: {
    paddingVertical: moderateScale(10),
  },
});

export default Tips;
