import React from 'react';
import { Text, View, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import TYPOGRAPHY from '../constants/typography';
import SPACING from '../constants/spacing';
const img = require('../../assets/abstract/abstract7.jpg');

interface IUserSectionProps {
  title: string;
  items: Array<{ title: string; subtitle?: string }>;
  extendable?: boolean;
}

const UserProfileCard: React.FC<IUserSectionProps> = ({
  title,
  items,
  extendable
}) => {
  const navigation = useNavigation();

  const handleShowProjectForm = () => {
    navigation.navigate('CreateProject' as never);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContainer}>
        {items.map((item, index) => (
          <View style={styles.sectionCard} key={index}>
            <Image source={img} style={styles.userSectionImg} />
            <View>
              <Text style={styles.sectionCardTitle}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.sectionCardSubtitle}>{item.subtitle}</Text>
              )}
            </View>
          </View>
        ))}
        {extendable && (
          <Pressable
            style={styles.userSectionCard}
            onPress={handleShowProjectForm}
          >
            <Ionicons name="add-outline" size={20} color={COLORS.darkGrey} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  section: {
    marginBottom: SPACING.large
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.baseText,
    color: COLORS.darkGrey,
    marginBottom: SPACING.small
  },

  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    flexWrap: 'wrap'
  },

  sectionCard: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 8,
    backgroundColor: COLORS.fullWhite,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  sectionCardTitle: {
    fontSize: TYPOGRAPHY.baseText,
    fontWeight: '600',
    color: COLORS.darkGrey
  },

  sectionCardSubtitle: {
    fontSize: TYPOGRAPHY.noteText,
    color: COLORS.darkGrey
  },

  userSectionImg: {
    width: 32,
    height: 32,
    borderRadius: 100,
    marginRight: 8
  },

  userSectionCard: {
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 8,
    backgroundColor: COLORS.fullWhite,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
