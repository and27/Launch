import React, { useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { formStyles } from '../globalStyles/forms';
import { IProject } from './forms/CreateProject';
import { generateLearningPath } from '../utils/getLearningPath';
import TYPOGRAPHY from '../constants/typography';
import ProjectInfo from '../components/ProjectInfo';
import SPACING from '../constants/spacing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { questionnaire } from '../data/initialQuestionnaire';

const hammerIcon = require(`../../assets/icons/hammer.png`);
const boxIcon = require(`../../assets/icons/box.png`);
const glassIcon = require(`../../assets/icons/glass.png`);
const bulbIcon = require(`../../assets/icons/bulb.png`);
const cartIcon = require(`../../assets/icons/cart.png`);
const graphIcon = require(`../../assets/icons/graph.png`);

const iconsMap = {
  ideas: bulbIcon,
  evaluation: glassIcon,
  concept: hammerIcon,
  mvp: boxIcon,
  mvpLaunch: graphIcon,
  businessModel: cartIcon
};

const getProjectInfo = async route => {
  const localProject = await AsyncStorage.getItem('project');
  if (localProject) return JSON.parse(localProject);

  const { params } = route;
  if (!params) return null;

  const { project } = params;
  return project;
};

const LearningPath = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [currentProject, setCurrentProject] = React.useState<IProject | null>();

  useEffect(() => {
    const getProject = async () => {
      const project = await getProjectInfo(route);
      setCurrentProject(project);
    };

    getProject();
  }, [isFocused]);

  const el1 = React.useRef(new Animated.Value(0)).current;
  const el2 = React.useRef(new Animated.Value(0)).current;
  const el3 = React.useRef(new Animated.Value(0)).current;
  const el4 = React.useRef(new Animated.Value(0)).current;
  const el5 = React.useRef(new Animated.Value(0)).current;
  const learningPath = generateLearningPath(questionnaire);

  const userProgress = {
    ideas: 1,
    evaluation: 1,
    concept: 1,
    mvp: 0,
    map: 0,
    user: 0,
    megaphone: 0
  };

  const getImageSrc = stage => {
    return iconsMap[stage.name];
  };

  const handleSelectStage = stage => {
    navigation.navigate('LearningUnit', { stage, project: currentProject });
  };

  const handleCreateProject = () => {
    navigation.navigate('CreateProject');
  };

  const getStageTitleStyle = stage => {
    const isCurrentSetpCompleted = userProgress[stage.name] === 1;
    if (isCurrentSetpCompleted) {
      return styles.learningUnitTitle;
    } else {
      return { ...styles.learningUnitTitle, color: COLORS.lightGrey };
    }
  };
  const animatableElements = [el1, el2, el3, el4, el5];

  useEffect(() => {
    if (!currentProject) return;
    const animatable = animatableElements.map(elem =>
      Animated.timing(elem, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    );

    Animated.stagger(200, animatable).start();
  }, [currentProject]);

  const dots = [];
  for (let i = 0; i < 7; i++) {
    dots.push(<View key={i} style={styles.dot} />);
  }

  if (!currentProject)
    return (
      <View style={styles.newProjectContainer}>
        <Image source={iconsMap['ideas']} style={styles.newProjectImg} />
        <Text style={styles.subtitle}>Lleva tu idea al siguiente nivel</Text>
        <Text style={styles.description}>
          Empieza a construir tu startup ahora. Sigue nuestros pasos y mira cómo
          tu idea se convierte en un proyecto exitoso.
        </Text>
        <Pressable style={styles.btn} onPress={handleCreateProject}>
          <Text style={formStyles.btnPrimaryText}>Iniciar ahora</Text>
        </Pressable>
      </View>
    );

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Tu ruta</Text>
          <ProjectInfo
            handleForm={handleCreateProject}
            currentProject={{
              ...currentProject
            }}
          />
          {learningPath?.map((stage, index) => (
            <Animated.View
              key={index}
              style={{
                transform: [
                  {
                    translateX: animatableElements[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-100, 0]
                    })
                  }
                ]
              }}
            >
              <Pressable
                style={styles.learningStage}
                key={index}
                onPress={() => handleSelectStage(stage)}
              >
                <View style={styles.dotContainer}>{dots}</View>

                <View style={styles.moduleImgContainer}>
                  <Image
                    source={getImageSrc(stage)}
                    style={styles.moduleImg}
                  ></Image>
                </View>
                <Text style={getStageTitleStyle(stage)}>{stage.title}</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    position: 'absolute',
    left: 24,
    opacity: 0.5
  },

  dot: {
    width: 1,
    top: 20,
    height: 5,
    backgroundColor: 'black',
    marginBottom: 2,
    opacity: 1
  },

  newProjectContainer: {
    backgroundColor: COLORS.primaryWhite,
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.medium
  },

  container: {
    backgroundColor: COLORS.primaryWhite,
    flex: 1,
    justifyContent: 'center',
    padding: SPACING.medium,
    minHeight: '100%'
  },

  title: {
    fontSize: TYPOGRAPHY.extraLargeTitle,
    marginBottom: SPACING.large,
    color: COLORS.primaryBlack
  },

  subtitle: {
    textAlign: 'left',
    fontSize: TYPOGRAPHY.title,
    fontWeight: '700',
    marginBottom: SPACING.base,
    color: COLORS.primaryBlack,
    width: '100%',
    lineHeight: 30
  },

  description: {
    fontSize: TYPOGRAPHY.baseText,
    marginBottom: SPACING.large,
    color: COLORS.darkGrey,
    width: '100%'
  },

  learningStage: {
    shadowColor: COLORS.darkGrey,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.medium,
    backgroundColor: COLORS.primaryWhite,
    paddingBottom: SPACING.medium,
    marginTop: SPACING.base,
    position: 'relative'
  },

  learningUnitTitle: {
    fontWeight: '600',
    color: COLORS.darkGrey
  },

  listItem: {
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    paddingVertical: 16,
    alignItems: 'center'
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
    fontSize: TYPOGRAPHY.title,
    color: COLORS.primaryWhite
  },

  btn: {
    ...formStyles.btnPrimary,
    width: '100%',
    marginBottom: 24
  },

  moduleImgContainer: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: COLORS.primaryPurple,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },

  moduleImg: {
    width: 24,
    height: 24
  },

  newProjectImg: {
    width: 64,
    height: 64,
    borderRadius: 50,
    marginBottom: SPACING.medium
  }
});
export default LearningPath;
