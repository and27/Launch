import React, { useContext } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import uuid from 'react-native-uuid';
import { AuthContext } from '../../context/authContext';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';
import { signupWithPassword } from '../../utils/supabase';

const windowWidth = Dimensions.get('window').width;

export default function Register() {
  const [user, setUser] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSaveData = async () => {
    const userid = uuid.v4();
    const { error } = await signupWithPassword({
      ...user,
      userid: userid
    });
    if (error) {
      console.log(error);
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <View>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            onChangeText={text => setUser({ ...user, email: text })}
          />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={text => setUser({ ...user, password: text })}
          />
          <Text style={styles.label}>Repite tu contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={text => setUser({ ...user, password: text })}
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