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
import { useFonts } from 'expo-font';

const bookIcon = require(`../../assets/icons/book.png`);
const boxIcon = require(`../../assets/icons/box.png`);
const graphIcon = require(`../../assets/icons/graph.png`);
const lightIcon = require(`../../assets/icons/light.png`);
const mapIcon = require(`../../assets/icons/map.png`);
const userIcon = require(`../../assets/icons/user.png`);
const megaphoneIcon = require(`../../assets/icons/megaphone.png`);

const bookBlackIcon = require(`../../assets/icons/bookBlack.png`);
const boxBlackIcon = require(`../../assets/icons/boxBlack.png`);
const graphBlackIcon = require(`../../assets/icons/graphBlack.png`);
const lightBlackIcon = require(`../../assets/icons/lightBlack.png`);
const mapBlackIcon = require(`../../assets/icons/mapBlack.png`);
const userBlackIcon = require(`../../assets/icons/userBlack.png`);
const megaphoneBlackIcon = require(`../../assets/icons/megaphoneBlack.png`);

const iconsMap = {
  ideas: lightIcon,
  evaluation: graphIcon,
  concept: bookIcon,
  mvp: boxIcon,
  map: mapIcon,
  user: userIcon,
  megaphone: megaphoneIcon
};

const iconsBlackMap = {
  ideas: lightBlackIcon,
  evaluation: graphBlackIcon,
  concept: bookBlackIcon,
  mvp: boxBlackIcon,
  map: mapBlackIcon,
  user: userBlackIcon,
  megaphone: megaphoneBlackIcon
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
  const [fontsLoaded] = useFonts({
    vegan: require('../../assets/fonts/vegan.ttf'),
    inter: require('../../assets/fonts/Inter-ExtraBoldItalic.otf')
  });
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
    const isCompleted = userProgress[stage.name] === 1;
    const img = isCompleted ? iconsMap[stage.name] : iconsBlackMap[stage.name];
    if (!img) return iconsBlackMap['ideas'];
    return img;
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

  if (!currentProject)
    return (
      <View style={styles.newProjectContainer}>
        <Image source={iconsMap['ideas']} style={styles.newProjectImg} />
        <Text style={styles.subtitle}>¿Tienes una nueva idea en mente?</Text>
        <Text style={styles.description}>
          Crea un nuevo proyecto paso a paso.
        </Text>
        <Pressable style={styles.btn} onPress={handleCreateProject}>
          <Text style={formStyles.btnPrimaryText}>Crea un nuevo proyecto</Text>
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
                <Image
                  source={getImageSrc(stage)}
                  style={styles.moduleImg}
                ></Image>
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
  newProjectContainer: {
    backgroundColor: COLORS.primaryWhite,
    padding: SPACING.medium,
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    textAlign: 'center',
    fontSize: TYPOGRAPHY.smallTitle,
    fontFamily: 'vegan',
    letterSpacing: -0.1,
    fontWeight: '700',
    // marginBottom: SPACING.base,
    color: '#bbb'
  },

  description: {
    fontSize: TYPOGRAPHY.baseText,
    // marginBottom: SPACING.large,
    fontFamily: 'inter',
    fontWeight: '900',
    color: '#ccc'
  },

  learningStage: {
    shadowColor: COLORS.darkGrey,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.medium,
    shadowRadius: 0,
    elevation: 1,
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
    backgroundColor: COLORS.primaryWhite,
    paddingBottom: SPACING.medium,
    marginTop: SPACING.base
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

  moduleImg: {
    width: 48,
    height: 48,
    borderRadius: 50
  },

  newProjectImg: {
    width: 64,
    height: 64,
    borderRadius: 50
    // marginBottom: SPACING.medium
  }
});
export default LearningPath;
