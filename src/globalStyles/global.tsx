import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import SPACING from '../constants/spacing';

export const globalStyles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.primaryWhite,
    paddingHorizontal: SPACING.medium,
    flex: 1,
    alignItems: 'center'
  },

  title: {
    fontSize: 24
  }
});
