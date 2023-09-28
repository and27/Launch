import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Video, ResizeMode, Audio } from 'expo-av';
import { COLORS } from '../constants/colors';
import { formStyles } from '../globalStyles/forms';

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

const LearningUnit = ({ route }) => {
  const currentPath = route?.params;
  const [learningUnitResponse, setLearningUnitResponse] = React.useState('');
  const video = React.useRef(null);

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
            <View>
              <Text style={styles.subtitle}>{currentPath.question}</Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="Escribe tu misión aquí"
                style={{
                  borderBottomColor: COLORS.primaryBlack,
                  borderBottomWidth: 1,
                  minHeight: 40,
                  textAlignVertical: 'top'
                }}
                onChangeText={text => setLearningUnitResponse(text)}
                value={learningUnitResponse}
              />
            </View>
          )}
        </View>
        <Pressable style={{ ...formStyles.btnPrimary, marginTop: 16 }}>
          <Text style={formStyles.btnPrimaryText}>Enviar</Text>
        </Pressable>
      </ScrollView>
    </>
  );
};

export default LearningUnit;

const styles = StyleSheet.create({
  container: {
    margin: 16,
    paddingBottom: 32,
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
  }
});
