import React, { useContext } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Text,
  Pressable,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { login, loginWithGoogle } from '../../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { AuthContext } from '../../context/authContext';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';

const windowWidth = Dimensions.get('window').width;

export default function Login() {
  const [credentials, setCredentials] = React.useState<{
    email?: string;
    password?: string;
  }>({});

  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(AuthContext);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('user', value);
    } catch (e) {
      console.log('error');
    }
  };

  const handlePasswordLogin = async () => {
    const { data, error } = await login({
      email: credentials?.email,
      password: credentials?.password
    });
    if (error) {
      console.log(error);
    } else if (data?.session) {
      setIsLoggedIn(true);
      const userInfo = {
        id: data?.session?.user?.id,
        name: data?.session?.user?.email
      };
      storeData(JSON.stringify(userInfo));
    }
  };

  const handleGoogleLogin = async () => {
    const { user, error } = await loginWithGoogle();
  };

  const handleRegister = () => {
    navigation.navigate('Register' as never);
  };
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/abstract/abstract5.jpg')}
          style={styles.logo}
        />
        <View>
          <Text>Ingresa tu correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text =>
              setCredentials({ ...credentials, email: text })
            }
          />
          <Text>Ingresa tu contraseña </Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={text =>
              setCredentials({ ...credentials, password: text })
            }
          />
          <Pressable
            style={formStyles.btnPrimary}
            onPress={handlePasswordLogin}
            accessibilityLabel="Login button"
          >
            <Text style={formStyles.btnPrimaryText}>Ingresa</Text>
          </Pressable>
          <Pressable
            style={{ ...formStyles.btnSecondary, marginVertical: 8 }}
            onPress={handleGoogleLogin}
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
      </View>
    </>
  );
}

const formGlobalStyles = formStyles;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screenContainer,
    justifyContent: 'space-around'
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 200
  },
  input: {
    ...formGlobalStyles.input,
    width: windowWidth - 40,
    marginBottom: 24
  }
});
