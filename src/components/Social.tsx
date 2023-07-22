import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

export default function Social() {
  return (
    <View style={styles.social}>
      <Ionicons name="logo-linkedin" size={18} color="black" />
      <Ionicons name="logo-instagram" size={18} color="black" />
      <Ionicons name="logo-whatsapp" size={18} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  social: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  }
});
