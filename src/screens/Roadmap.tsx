import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/colors';

const roadmapSteps = [
  'La misión',
  'La propuesta de valor',
  'El prototipo',
  'La validación',
  'El costo inicial'
];
const Roadmap = () => {
  const img = require('../../assets/abstract/abstract5.jpg');
  const navigation = useNavigation();
  const handleSelectSte = () => {
    navigation.navigate('LearningUnit' as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <Image source={img} style={styles.userImg} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Project P</Text>
          <Text style={styles.listItemSubtitle}>Educación</Text>
        </View>
      </View>
      {roadmapSteps.map((step, index) => (
        <Pressable style={styles.option} key={index} onPress={handleSelectSte}>
          <View style={styles.number}>
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>
          <Text>{step}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fcfcfc',
    padding: 20,
    minHeight: '100%',
    paddingTop: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12
  },
  option: {
    shadowColor: '#555',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: COLORS.primaryWhite,
    padding: 12
  },
  number: {
    width: 24,
    height: 24,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

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
export default Roadmap;
