import React from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { Dimensions } from 'react-native';
import { login } from '../supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../colors';

const windowWidth = Dimensions.get('window').width;

export default function Login() {
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('user', value);
    } catch (e) {
      console.log('error');
    }
  };

  const handleLogin = async () => {
    const { data } = await login();
    if (data?.session) {
      storeData(data?.session?.user?.id);
    }
  };
  return (
    <>
      <View style={styles.container2}>
        <View>
          <Text>User</Text>
          <TextInput style={styles.input} placeholder="Username" />
          <Text>Password</Text>
          <TextInput style={styles.input} placeholder="Password" />
          <Button
            onPress={handleLogin}
            title="Learn More"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container2: {
    margin: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    marginBottom: 8
  },
  input: {
    height: 40,
    alignSelf: 'stretch',
    borderColor: '#bbb',
    backgroundColor: COLORS.primaryWhite,
    borderWidth: 1,
    marginBottom: 8,
    padding: 5,
    borderRadius: 8,
    width: windowWidth - 40
  }
});
