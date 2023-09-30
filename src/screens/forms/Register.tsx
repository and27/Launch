import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  Image
} from 'react-native';
import { Dimensions } from 'react-native';
import uuid from 'react-native-uuid';
import { AuthContext } from '../../context/authContext';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';
import { signupWithPassword } from '../../utils/supabase';
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native-gesture-handler';
import { storeDataLocally } from '../../utils/asyncStore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type RegisterFormValues = {
  email: string;
  password: string;
};

export default function Register() {
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSaveData = async (registerInfo: RegisterFormValues) => {
    const userid = uuid.v4();
    const { error } = await signupWithPassword({
      ...registerInfo,
      userid: userid
    });

    if (error) {
      console.log(error);
    } else {
      setIsLoggedIn(true);
      storeDataLocally({ key: 'user', value: userid });
    }
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = (formInfo: RegisterFormValues) => {
    const user = {
      email: formInfo.email,
      password: formInfo.password
    };

    handleSaveData(user);
  };

  const onError: SubmitErrorHandler<RegisterFormValues> = (errors, e) => {
    return console.error(errors);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      automaticallyAdjustKeyboardInsets
    >
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/abstract/abstract7.jpg')}
          style={styles.logo}
        />
      </View>
      <View>
        <Text>Correo</Text>
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder="Correo"
                value={value}
                onChangeText={onChange}
              />
              {errors.email && (
                <Text style={formStyles.errorText}>{error.message}</Text>
              )}
            </View>
          )}
          rules={{
            required: 'Ingresa tu correo',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Ingresa un correo válido'
            }
          }}
        />
        <Text>Contraseña</Text>
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder="Contraseña"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
              {errors.password && (
                <Text style={formStyles.errorText}>{error.message}</Text>
              )}
            </View>
          )}
          rules={{
            required: 'Ingresa tu contraseña',
            minLength: {
              value: 8,
              message: 'Debe contener mínimo 8 caracteres'
            }
          }}
        />

        <Text>Repite tu contraseña</Text>
        <Controller
          control={control}
          name="passwordVerification"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                placeholder="Contraseña"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
              {errors.passwordVerification && (
                <Text style={formStyles.errorText}>{error.message}</Text>
              )}
            </View>
          )}
          rules={{
            required: true,
            validate: (value: string) => {
              if (watch('password') != value) {
                return 'Las contraseñas no coinciden';
              }
            }
          }}
        />
        <Pressable
          style={styles.btn}
          onPress={handleSubmit(onSubmit, onError)}
          accessibilityLabel="Sign in button"
        >
          <Text style={styles.btnText}>Continuar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const formGlobalStyles = formStyles;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screenContainer,
    marginVertical: windowHeight / 9,
    paddingTop: -windowHeight / 12
  },

  inputContainer: {
    marginBottom: 24,
    minHeight: 48
  },

  input: {
    ...formGlobalStyles.input,
    width: windowWidth - 40
  },

  btn: {
    ...formGlobalStyles.btnPrimary,
    marginTop: 16
  },

  btnText: {
    ...formGlobalStyles.btnPrimaryText
  },

  imageContainer: {
    width: 80,
    height: 80,
    marginBottom: 24
  },

  logo: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderRadius: 100
  }
});
