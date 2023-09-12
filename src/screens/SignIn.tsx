import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Pressable
} from 'react-native';
import { Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';
import { AuthContext } from '../context/authContext';
import RNPickerSelect from 'react-native-picker-select';
import { formStyles } from '../globalStyles/forms';

const windowWidth = Dimensions.get('window').width;

export default function SignIn() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSaveData = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text>Name</Text>
          <TextInput style={styles.input} placeholder="Name" />
          <Text style={styles.label}>Área favorita</Text>
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            style={pickerStyles}
            items={[
              { label: 'Educación', value: 'education' },
              { label: 'Medio Ambiente', value: 'ambient' },
              { label: 'Salud', value: 'salud' }
            ]}
          />
          <Text style={styles.label}>Conocimientos de emprendimiento</Text>
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            style={pickerStyles}
            items={[
              { label: 'Alto', value: 'alto' },
              { label: 'Medio', value: 'medio' },
              { label: 'Bajo', value: 'bajo' }
            ]}
          />
          <Text style={styles.label}>Objetivo principal</Text>
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            style={pickerStyles}
            items={[
              { label: 'Crecimiento rápido', value: 'crecimiento' },
              { label: 'Impacto social', value: 'social' },
              { label: 'Rentabilidad a largo plazo', value: 'rentabilidad' }
            ]}
          />
          <Text style={styles.label}>Recursos disponibles</Text>
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            style={pickerStyles}
            items={[
              { label: 'Financiamiento propio', value: 'financiamiento' },
              { label: 'Tiempo libre', value: 'tiempo' },
              { label: 'Red de contactos', value: 'contactos' }
            ]}
          />
          <Pressable
            style={styles.btn}
            onPress={handleSaveData}
            accessibilityLabel="Sign in button"
          >
            <Text style={styles.btnText}>Continuar</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const formGlobalStyles = formStyles;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    marginBottom: 8
  },
  input: {
    ...formGlobalStyles.input,
    width: windowWidth - 40
  },
  btn: {
    ...formGlobalStyles.btn,
    marginTop: 32
  },
  btnText: {
    ...formGlobalStyles.btnText
  },
  label: {
    marginTop: 24
  }
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30
  }
});
