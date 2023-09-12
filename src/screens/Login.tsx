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
import { login } from '../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/colors';
import { AuthContext } from '../context/authContext';
import { formStyles } from '../globalStyles/forms';

const windowWidth = Dimensions.get('window').width;

export default function Login() {
  const isFirstTime = true;
  const navigation = useNavigation();
  const { setIsLoggedIn } = useContext(AuthContext);
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('user', value);
    } catch (e) {
      console.log('error');
    }
  };

  const handleLogin = async () => {
    const { data } = await login();
    if (isFirstTime) {
      navigation.navigate('SignIn' as never);
      storeData(data?.session?.user?.id);
    } else if (data?.session) {
      setIsLoggedIn(true);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../assets/abstract/abstract5.jpg')}
          style={styles.logo}
        />
        <View>
          <Text>Ingresa tu correo</Text>
          <TextInput style={styles.input} placeholder="Email" />
          <Text>Ingresa tu contraseña </Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
          />
          <Pressable
            style={styles.btn}
            onPress={handleLogin}
            accessibilityLabel="Login button"
          >
            <Text style={styles.btnText}>Ingresa</Text>
          </Pressable>
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
    backgroundColor: COLORS.primaryWhite,
    padding: 20,
    flex: 1,
    alignItems: 'center',
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
    marginBottom: 32
  },
  btn: {
    ...formGlobalStyles.btn
  },
  btnText: {
    ...formGlobalStyles.btnText
  }
});
