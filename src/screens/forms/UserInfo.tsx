import React from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import uuid from 'react-native-uuid';
import RNPickerSelect from 'react-native-picker-select';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';

const windowWidth = Dimensions.get('window').width;

export default function UserInfo() {
  const [user, setUser] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const handleSaveData = async () => {
    const userid = uuid.v4();

    //todo: guardar info de usuario en supabase
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Completa tu perfil</Text>
        <View>
          <Text>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={text => setUser({ ...user, name: text })}
          />
          <Text>País</Text>
          <TextInput
            style={styles.input}
            placeholder="País"
            onChangeText={text => setUser({ ...user, name: text })}
          />
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            onChangeText={text => setUser({ ...user, email: text })}
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
            <Text style={styles.btnText}>Guardar</Text>
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
