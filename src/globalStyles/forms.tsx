import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';

const baseButton: any = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  borderRadius: 8
};

export const formStyles = StyleSheet.create({
  input: {
    height: 40,
    alignSelf: 'stretch',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    padding: 5,
    borderRadius: 4
  },

  btnBase: {
    ...baseButton
  },

  btnSecondaryBase: {
    ...baseButton,
    borderWidth: 1
  },

  btnPrimary: {
    ...baseButton,
    backgroundColor: COLORS.primaryBlack
  },

  btnPrimaryText: {
    color: COLORS.lightGrey,
    fontSize: TYPOGRAPHY.smallTitle
  },

  btnSecondary: {
    ...baseButton,
    backgroundColor: COLORS.primaryWhite,
    borderColor: COLORS.primaryBlack,
    borderWidth: 1
  },

  btnSecondaryText: {
    color: COLORS.primaryBlack,
    fontSize: TYPOGRAPHY.smallTitle
  },

  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4
  }
});
