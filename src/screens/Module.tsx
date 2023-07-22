import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../colors';

export default function User({ item }) {
  const navigation = useNavigation();
  const handleModulePress = () => {
    navigation.navigate('Home' as never);
  };
  return (
    <View style={styles.listItem}>
      <View style={styles.content}>
        <View style={styles.level}>
          <Text style={styles.levelText}>{item.level}</Text>
        </View>
        <Text style={styles.listItemTitle}>{item.title}</Text>
      </View>
      <View style={styles.social}>
        <Pressable onPress={handleModulePress}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5
  },

  listItemTitle: {},

  listItemSubtitle: {
    color: '#777'
  },

  userImg: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  social: {
    marginLeft: 'auto',
    marginRight: 10,
    alignSelf: 'flex-start'
  },
  content: { display: 'flex', gap: 4 },
  level: {
    backgroundColor: COLORS.primaryBlack,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    color: COLORS.primaryWhite,
    alignSelf: 'baseline'
  },
  levelText: {
    color: COLORS.primaryWhite,
    fontSize: 12
  }
});
