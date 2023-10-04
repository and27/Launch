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
import { COLORS } from '../../constants/colors';
import { AuthContext } from '../../context/authContext';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';
import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form';
import { storeDataLocally } from '../../utils/asyncStore';
import SPACING from '../../constants/spacing';

const windowWidth = Dimensions.get('window').width;
type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(AuthContext);

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
    const parsedUserInfo = JSON.stringify(userInfo);
    storeDataLocally({ key: 'user', value: parsedUserInfo });
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      automaticallyAdjustKeyboardInsets
    >
      <Image
        source={require('../../../assets/abstract/abstract5.jpg')}
        style={styles.logo}
      />
      <View>
        <Text style={styles.labelText}>Ingresa tu correo</Text>
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

        <Text style={styles.labelText}>Ingresa tu contraseña </Text>
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
                <Text style={formStyles.errorText}>{error.message}</Text>
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
        <View style={styles.primaryActions}>
          <Pressable
            style={({ pressed }) => [
              {
                width: windowWidth - 40,
                backgroundColor: pressed ? COLORS.darkGrey : COLORS.primaryBlack
              },
              formStyles.btnBase
            ]}
            onPress={handleSubmit(onSubmit, onError)}
            accessibilityLabel="Login button"
          >
            <Text style={formStyles.btnPrimaryText}>Ingresa</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                width: windowWidth - 40,
                backgroundColor: pressed
                  ? COLORS.secondaryWhite
                  : COLORS.primaryWhite
              },
              formStyles.btnSecondaryBase
            ]}
            onPress={() => {}}
            accessibilityLabel="Google login button"
          >
            <Text style={formStyles.btnSecondaryText}>Google login</Text>
          </Pressable>
        </View>
        <View style={styles.secondaryActons}>
          <Pressable onPress={handleRegister}>
            <Text style={formStyles.btnSecondaryText}>Crear cuenta</Text>
          </Pressable>
          <Pressable>
            <Text style={formStyles.btnSecondaryText}>
              Olvidé mi contraseña
            </Text>
          </Pressable>
        </View>
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
    marginBottom: SPACING.medium,
    minHeight: 48
  },

  input: {
    ...formGlobalStyles.input,
    width: windowWidth - 40
  },

  labelText: {
    color: COLORS.darkGrey
  },

  secondaryActons: {
    display: 'flex',
    gap: SPACING.medium,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.large
  },

  primaryActions: {
    display: 'flex',
    gap: SPACING.base,
    alignItems: 'center',
    width: windowWidth - 40,
    marginTop: SPACING.base
  }
});
