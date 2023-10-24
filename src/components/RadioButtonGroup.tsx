import { View, Text, Pressable, StyleSheet } from 'react-native';
import SPACING from '../constants/spacing';
import { COLORS } from '../constants/colors';

const RadioGroupInput = ({ onChange, selected }) => {
  return (
    <View style={styles.radioGroupContainer} aria-labelledby="Select one item">
      <RadioButton
        value="0"
        label="Yes"
        onSelect={onChange}
        selected={selected === '0'}
      />
      <RadioButton
        value="1"
        label="No"
        onSelect={onChange}
        selected={selected === '1'}
      />
    </View>
  );
};

const RadioButton = (props: {
  value: string;
  label: string;
  onSelect;
  selected;
}) => {
  const id = `radiogroup-${props.value}`;
  return (
    <>
      <Pressable
        accessibilityLabel={props.label}
        style={{
          ...styles.radioGroupBtn,
          borderColor: props.selected ? COLORS.primaryBlack : COLORS.lightGrey
        }}
        onPress={() => props.onSelect(props.value)}
      >
        <Text style={{ color: COLORS.primaryBlack }}>{props.label}</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  radioGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.base,
    marginBottom: SPACING.small
  },

  radioGroupBtn: {
    flexBasis: '50%',
    flexGrow: 1,
    flexShrink: 1,
    borderRadius: 4,
    padding: SPACING.base,
    borderWidth: 1.2
  }
});

export default RadioGroupInput;
