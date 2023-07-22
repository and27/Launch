import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Video, ResizeMode, Audio } from 'expo-av';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLORS } from '../colors';

export default function LearningUnit() {
  const clientVideo = require('../../assets/ClientVideo.mp4');
  const video = React.useRef(null);
  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  });

  return (
    <>
      <ScrollView contentContainerStyle={styles.container2}>
        <View style={styles.card}>
          <Text style={styles.title}>¿Cuál es mi nicho?</Text>
          <Video
            ref={video}
            style={styles.video}
            source={clientVideo}
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
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container2: {
    margin: 16,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
    letterSpacing: '-0.5%'
  },
  subtitle: {
    fontWeight: '500',
    marginVertical: 16
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
