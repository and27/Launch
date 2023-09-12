import { Image, Text, View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

const img = require('../../assets/abstract/abstract1.jpg');

export default function ProfileUser({ item }) {
  const navigation = useNavigation();
  return (
    <View style={styles.listItem}>
      <Image source={img} style={styles.userImg} />
      <View style={styles.userInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.listItemSubtitle}>{item.country}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    paddingVertical: 16,
    alignItems: 'center'
  },

  userInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  name: { fontWeight: '600', marginTop: 4 },
  listItemSubtitle: {
    color: '#777'
  },

  userImg: {
    width: 75,
    height: 75,
    borderRadius: 100
  },
  social: {
    marginLeft: 'auto',
    marginRight: 10,
    marginTop: 16,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primaryBlack,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5
  },
  level: {
    fontSize: 12,
    color: COLORS.primaryWhite
  }
});
