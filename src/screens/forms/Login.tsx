import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Pressable,
  Image,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { login } from '../../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { AuthContext } from '../../context/authContext';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';
import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form';

const windowWidth = Dimensions.get('window').width;
type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(AuthContext);

  const storeDataLocally = async value => {
    try {
      await AsyncStorage.setItem('user', value);
    } catch (e) {
      console.log('error');
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const onSubmit = (userCredentials: FormValues) => {
    handlePasswordLogin(userCredentials);
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.error(errors);
  };

  const handlePasswordLogin = async (userCredentials: FormValues) => {
    const { data, error } = await login({
      email: userCredentials?.email,
      password: userCredentials?.password
    });

    if (error) {
      console.log(error);
      return setIsLoggedIn(false);
    }

    const userInfo = {
      id: data?.session?.user?.id,
      name: data?.session?.user?.email
    };
    storeDataLocally(JSON.stringify(userInfo));
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      contentContainerStyle={styles.container}
    >
      <Image
        source={require('../../../assets/abstract/abstract5.jpg')}
        style={styles.logo}
      />
      <View>
        <Text>Ingresa tu correo</Text>
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
                placeholder="Email"
                value={value}
                onChangeText={onChange}
              />
              {errors.email && (
                <Text style={styles.errorText}>{error.message}</Text>
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

        <Text>Ingresa tu contraseña </Text>
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error }
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: error ? COLORS.error : COLORS.primaryBlack
                }}
                onBlur={onBlur}
                placeholder="Contraseña"
                value={value}
                onChangeText={onChange}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.errorText}>{error.message}</Text>
              )}
            </View>
          )}
          rules={{
            required: 'Ingresa tu contraseña',
            minLength: {
              value: 8,
              message: 'La contraseña debe tener al menos 8 caracteres'
            }
          }}
        />
        <Pressable
          style={formStyles.btnPrimary}
          onPress={handleSubmit(onSubmit, onError)}
          accessibilityLabel="Login button"
        >
          <Text style={formStyles.btnPrimaryText}>Ingresa</Text>
        </Pressable>
        <Pressable
          style={{ ...formStyles.btnSecondary, marginVertical: 8 }}
          onPress={() => {}}
          accessibilityLabel="Google login button"
        >
          <Text style={formStyles.btnSecondaryText}>Google login</Text>
        </Pressable>
        <Button
          title="Crear cuenta"
          onPress={handleRegister}
          color={COLORS.primaryBlack}
        />
        <Button
          title="Olvidé mi contraseña"
          onPress={() => {}}
          color={COLORS.primaryBlack}
        />
      </View>
    </ScrollView>
  );
}

const formGlobalStyles = formStyles;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screenContainer,
    justifyContent: 'space-around',
    marginVertical: 64
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 200
  },
  inputContainer: {
    marginBottom: 24,
    minHeight: 48
  },
  input: {
    ...formGlobalStyles.input,
    width: windowWidth - 40
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2
  }
});
