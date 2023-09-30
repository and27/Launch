import { Image, Text, View, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import SPACING from '../constants/spacing';

const img = require('../../assets/abstract/abstract1.jpg');

export default function UserProfileInfo({ item }) {
  const { navigate } = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleEditProfile = () => {
    navigate('UserInfo');
  };

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.img} />
      <View style={styles.content}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.subtitle}>{item?.country}</Text>
      </View>
      <Pressable onPress={handleEditProfile}>
        <Ionicons
          name="ellipsis-vertical-sharp"
          size={24}
          color={COLORS.darkGrey}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: SPACING.medium
  },

  content: {
    display: 'flex',
    alignItems: 'flex-start',
    flexGrow: 1,
    flexShrink: 1
  },

  title: {
    fontWeight: '700',
    fontSize: TYPOGRAPHY.baseText,
    color: COLORS.primaryBlack,
    paddingBottom: SPACING.small
  },

  subtitle: {
    color: COLORS.darkGreyk
  },

  img: {
    width: 64,
    height: 64,
    borderRadius: 100
  }
});
