import { Text, View, StyleSheet, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function User({ item }) {
  const handleModulePress = () => {};
  return (
    <View
      style={
        item.id % 2 === 0
          ? styles.listItem
          : { ...styles.listItem, ...styles.listItemWhite }
      }
    >
      <View style={styles.content}>
        <View style={styles.level}>
          <Text style={styles.levelText}>{item.level}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>
          This is the description and can be longer and even more...
        </Text>
      </View>
      <View style={styles.coin}>
        {/* <FontAwesome5 name="coins" size={18} color={COLORS.primaryBlack} />
        <Text style={styles.coinText}>500</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
    shadowColor: '#555',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 10,
    shadowRadius: 0,
    elevation: 1,
    borderRadius: 4,
    borderWidth: 1
  },
  // listItemWhite: { backgroundColor: COLORS.primaryWhite },
  coin: {
    flexShrink: 0,
    alignSelf: 'flex-start',
    display: 'flex',
    gap: 4,
    alignItems: 'center'
  },
  coinText: { fontSize: 12, color: COLORS.primaryBlack },
  content: { display: 'flex', flexBasis: '80%' },
  level: {
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'baseline',
    fontSize: 12
  },
  levelText: {
    color: 'black',
    fontSize: 12
  },
  title: { marginTop: 8 },
  description: {
    color: '#888'
  }
});
