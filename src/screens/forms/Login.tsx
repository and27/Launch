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
import { login } from '../../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { AuthContext } from '../../context/authContext';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';

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
      navigation.navigate('Register' as never);
      storeData(data?.session?.user?.id);
    } else if (data?.session) {
      setIsLoggedIn(true);
    }
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
          <TextInput style={styles.input} placeholder="Email" />
          <Text>Ingresa tu contraseña </Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
          />
          <Pressable
            style={formStyles.btnPrimary}
            onPress={handleLogin}
            accessibilityLabel="Login button"
          >
            <Text style={formStyles.btnPrimaryText}>Ingresa</Text>
          </Pressable>
          <Pressable
            style={{ ...formStyles.btnSecondary, marginVertical: 8 }}
            onPress={handleLogin}
            accessibilityLabel="Google login button"
          >
            <Text style={formStyles.btnSecondaryText}>Google login</Text>
          </Pressable>
          <Button
            title="Crear cuenta"
            onPress={() => {}}
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
