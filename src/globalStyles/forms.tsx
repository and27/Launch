import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const formStyles = StyleSheet.create({
  input: {
    height: 40,
    alignSelf: 'stretch',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    padding: 5,
    borderRadius: 4
  },
  btn: {
    backgroundColor: COLORS.primaryBlack,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 4
  },
  btnText: {
    color: COLORS.primaryWhite,
    fontSize: 18
  }
});
