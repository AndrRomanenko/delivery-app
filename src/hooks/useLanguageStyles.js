import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

/**
 * Regular "Left to right" styles
 */
const regularStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  aligment: {
    alignItems: 'flex-start',
  },
  text: {
    textAlign: 'left',
  },
  rotation: {
    transform: [{ rotate: '0deg' }],
  },
});

/**
 * Mirrored "Right to left" styles for HE language
 */
const rtlStyles = StyleSheet.create({
  row: {
    flexDirection: 'row-reverse',
  },
  rowReverse: {
    flexDirection: 'row',
  },
  aligment: {
    alignItems: 'flex-end',
  },
  text: {
    textAlign: 'right',
  },
  rotation: {
    transform: [{ rotate: '180deg' }],
  },
});

const useLanguageStyles = () => {
  const { i18n } = useTranslation();

  const isReversed = i18n.language === 'he';
  const languageStyles = isReversed ? rtlStyles : regularStyles;

  return { languageStyles, isReversed };
};

export default useLanguageStyles;
