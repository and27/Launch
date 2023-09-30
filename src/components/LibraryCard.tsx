import { Text, View, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import SPACING from '../constants/spacing';
const img = require('../../assets/abstract/abstract7.jpg');

export default function LibraryCard({ item }) {
  return (
    <View style={styles.listItem}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.level}</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image source={img} style={styles.img} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: COLORS.fullWhite,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrey
  },

  imgContainer: {
    alignSelf: 'flex-start',
    display: 'flex',
    gap: 4,
    alignItems: 'center'
  },

  content: { display: 'flex', flexShrink: 1 },

  title: {
    marginBottom: SPACING.base,
    fontWeight: '600',
    fontSize: TYPOGRAPHY.baseText,
    color: COLORS.primaryBlack
  },

  subtitle: {
    color: COLORS.darkGrey,
    fontSize: TYPOGRAPHY.noteText
  },

  img: {
    width: 60,
    height: 60,
    borderRadius: 50
  }
});
