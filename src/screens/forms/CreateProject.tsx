import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import { AuthContext } from '../../context/authContext';
import RNPickerSelect from 'react-native-picker-select';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';

const windowWidth = Dimensions.get('window').width;

export default function CreateProject() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSaveData = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>¿Tienes una idea?</Text>
        <View>
          <Text>Nombre del proyecto</Text>
          <TextInput style={styles.input} placeholder="Nombre" />
          <Text style={styles.label}>Área principal</Text>
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            style={pickerStyles}
            items={[
              { label: 'Educación', value: 'education' },
              { label: 'Medio Ambiente', value: 'ambient' },
              { label: 'Salud', value: 'salud' }
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
            accessibilityLabel="Create new project button"
          >
            <Text style={styles.btnText}>Empezar</Text>
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
