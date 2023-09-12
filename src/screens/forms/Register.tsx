import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import { AuthContext } from '../../context/authContext';
import RNPickerSelect from 'react-native-picker-select';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';

const windowWidth = Dimensions.get('window').width;

export default function Register() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSaveData = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <View>
          <Text>Name</Text>
          <TextInput style={styles.input} placeholder="Name" />
          <Text style={styles.label}>Correo</Text>
          <TextInput style={styles.input} placeholder="Correo" />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
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
    ...globalStyles.screenContainer,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  title: {
    ...globalStyles.title,
    marginBottom: 40
  },
  input: {
    ...formGlobalStyles.input,
    width: windowWidth - 40
  },
  btn: {
    ...formGlobalStyles.btnPrimary,
    marginTop: 32
  },
  btnText: {
    ...formGlobalStyles.btnPrimaryText
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
