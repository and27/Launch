import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../colors';

const LearningCard = ({ title, description, step, isEven }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('LearningUnit' as never);
      }}
      style={{ ...styles.card, alignSelf: isEven ? 'flex-start' : 'flex-end' }}
    >
      <View style={styles.cardInner}>
        <View style={styles.content}>
          <View style={styles.step}>
            <Text style={styles.stepNumber}>{step}</Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default LearningCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#555',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryWhite,
    padding: 8
  },

  cardInner: {
    backgroundColor: COLORS.primaryWhite,
    padding: 8,
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 4
  },
  step: {
    backgroundColor: '#555',
    width: 30,
    height: 30,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepNumber: {
    color: COLORS.primaryWhite
  },
  title: {
    fontWeight: '600',
    marginTop: 4
  },
  description: {
    color: '#777',
    maxWidth: 200
  }
});
