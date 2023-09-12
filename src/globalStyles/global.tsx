import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const globalStyles = StyleSheet.create({
  screenContainer: {
    backgroundColor: COLORS.primaryWhite,
    padding: 20,
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24
  }
});
