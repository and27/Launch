import React, { useEffect } from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Video, ResizeMode, Audio } from 'expo-av';
import { COLORS } from '../constants/colors';
import { formStyles } from '../globalStyles/forms';
import { saveStageInfo } from '../utils/supabase';
import SPACING from '../constants/spacing';
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form';

const ideas = require('../../assets/testVideoM.mp4');
const evaluation = require('../../assets/testVideoG.mp4');
const concept = require('../../assets/testVideoG2.mp4');
const mvp = require('../../assets/testVideoG3.mp4');

const videos = {
  ideas,
  evaluation,
  concept,
  mvp
};

const LearningUnit = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const video = React.useRef(null);

  const currentPath = route?.params?.stage;
  const currentStageName = currentPath.name;
  const currentProjectId = route?.params?.project[0].id;

  const handleStageResponse = async answer => {
    const stageInfo = {
      name: currentStageName,
      response: answer,
      project: currentProjectId
    };
    const { error } = await saveStageInfo(stageInfo);
    if (error) alert(error.message);
    else {
      alert('Tu respuesta ha sido guardada');
      navigation.goBack();
    }
    setIsLoading(false);
  };

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = answer => {
    setIsLoading(true);
    handleStageResponse(answer);
  };

  const onError: SubmitErrorHandler<{ response: string }> = (errors, e) => {
    return console.error(errors);
  };

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{currentPath.title}</Text>
          <Text style={styles.subtitle}>{currentPath.description}</Text>
          <Video
            ref={video}
            style={styles.video}
            source={videos[currentPath.name]}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={true}
            // onPlaybackStatusUpdate={status => setStatus(() => status)}
          />

          <View style={styles.checkContainer}>
            <BouncyCheckbox
              size={24}
              fillColor={COLORS.primaryBlack}
              iconStyle={{ borderColor: 'black' }}
              innerIconStyle={{ borderWidth: 1 }}
              onPress={(isChecked: boolean) => {}}
            />
            <Text style={styles.checkTex}>Mark as completed</Text>
          </View>
          {currentPath.question && (
            <View style={styles.questionContainer}>
              <Text style={styles.title}>Tu turno</Text>
              <Text style={styles.subtitle}>{currentPath.question}</Text>

              <Controller
                control={control}
                name="answer"
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error }
                }) => (
                  <View>
                    <TextInput
                      multiline={true}
                      numberOfLines={4}
                      placeholder="Escribe tu respuesta a continuación:"
                      style={{
                        borderBottomColor: COLORS.primaryBlack,
                        borderBottomWidth: 1,
                        minHeight: 60,
                        textAlignVertical: 'top'
                      }}
                      onBlur={onBlur}
                      value={value}
                      onChangeText={onChange}
                    />
                    {errors.answer && (
                      <Text style={formStyles.errorText}>{error.message}</Text>
                    )}
                  </View>
                )}
                rules={{
                  required: 'Ingresa tu respuesta'
                }}
              />
            </View>
          )}
        </View>
        <Pressable
          style={{ ...formStyles.btnPrimary, marginTop: 16 }}
          onPress={handleSubmit(onSubmit, onError)}
        >
          <Text style={formStyles.btnPrimaryText}>
            {isLoading ? <ActivityIndicator size={'small'} /> : 'Enviar'}
          </Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default LearningUnit;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    paddingBottom: SPACING.xlarge,
    justifyContent: 'center'
  },

  title: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600'
  },

  subtitle: {
    fontWeight: '500',
    marginVertical: 16,
    color: COLORS.darkGrey
  },

  card: {
    borderRadius: 16,
    padding: 8,
    display: 'flex',
    justifyContent: 'center'
  },

  video: { width: '100%', height: 200 },

  checkContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },

  checkTex: {
    color: COLORS.primaryBlack
  },

  questionContainer: {
    marginTop: SPACING.xlarge
  }
});
