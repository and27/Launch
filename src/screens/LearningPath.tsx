import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { formStyles } from '../globalStyles/forms';
import { IProject } from './forms/CreateProject';
import { generateLearningPath } from '../utils/getLearningPath';

const questionnaire = [
  {
    id: 1,
    question: 'Tienes una idea',
    answer: 'No'
  },
  {
    id: 2,
    question: '¿Tienes un mvp?',
    answer: 'No'
  },
  {
    id: 3,
    question: '¿Has validado tu mvp?',
    answer: 'No'
  }
];

const LearningPath = ({ navigation, route }) => {
  const img = require('../../assets/abstract/abstract5.jpg');
  const currentProject: IProject = route?.params;
  const learningPath = generateLearningPath(questionnaire);
  const handleSelectStep = step => {
    navigation.navigate('LearningUnit', step);
  };

  const handleCreateProject = () => {
    navigation.navigate('CreateProject');
  };

  if (!currentProject)
    return (
      <View style={styles.initialContainer}>
        <Pressable style={styles.btn} onPress={handleCreateProject}>
          <Text style={formStyles.btnPrimaryText}>Crea un nuevo proyecto</Text>
        </Pressable>
        <Text>
          Tu roadmap aparecerá en esta sección después de crear tu primera
          proyecto.
        </Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <Image source={img} style={styles.userImg} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{currentProject.name}</Text>
          <Text style={styles.listItemSubtitle}>{currentProject.area}</Text>
        </View>
      </View>
      {learningPath?.map((step, index) => (
        <Pressable
          style={styles.option}
          key={index}
          onPress={() => handleSelectStep(step)}
        >
          <View style={styles.number}>
            <Text>{index + 1}</Text>
          </View>
          <Text>{step.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  initialContainer: {
    backgroundColor: COLORS.primaryBlack,
    padding: 20,
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    backgroundColor: COLORS.primaryWhite,
    padding: 20,
    minHeight: '100%',
    paddingTop: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 12
  },

  option: {
    shadowColor: COLORS.darkGrey,
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
    borderColor: COLORS.darkGrey,
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
    color: COLORS.darkGrey
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
  },

  btn: {
    ...formStyles.btnPrimary,
    width: '100%',
    marginBottom: 24
  }
});
export default LearningPath;
