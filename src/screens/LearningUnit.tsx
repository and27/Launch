import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Video, ResizeMode, Audio } from 'expo-av';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLORS } from '../constants/colors';
import { formStyles } from '../globalStyles/forms';

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
          <Text style={styles.title}>Tu misión</Text>
          <Text style={styles.subtitle}>
            Tu misión es tu brújula hacia el éxito. Define tu propósito y
            dirección, estableciendo los valores fundamentales de tu empresa.
          </Text>
          <Video
            ref={video}
            style={styles.video}
            source={clientVideo}
            useNativeControls={true}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={true}
            // onPlaybackStatusUpdate={status => setStatus(() => status)}
          />

          {/* <View style={styles.checkContainer}>
            <BouncyCheckbox
              size={24}
              fillColor={COLORS.primaryBlack}
              iconStyle={{ borderColor: 'black' }}
              innerIconStyle={{ borderWidth: 1 }}
              onPress={(isChecked: boolean) => {}}
            />
            <Text style={styles.checkTex}>Mark as completed</Text>
          </View> */}
          <Text style={styles.subtitle}>
            Tu turno. Escribe de manera clara cuál es tu misión:
          </Text>
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
            // onChangeText={text => this.setState({ text })}
            // value={this.state.text}
          />
        </View>
        <Pressable style={{ ...formStyles.btn, marginTop: 16 }}>
          <Text style={formStyles.btnText}>Enviar</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container2: {
    margin: 16,
    paddingBottom: 32,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '600'
    // letterSpacing: '-0.5%'
  },
  subtitle: {
    fontWeight: '500',
    marginVertical: 16,
    color: '#777'
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
