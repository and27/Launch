import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfoFromId, saveUser, updateUser } from '../../utils/supabase';
import { COLORS } from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;

export default function UserInfoForm() {
  const navigation = useNavigation();
  const [isUpdated, setIsUpdated] = useState(false);
  const [user, setUser] = React.useState<{
    name?: string;
    country?: string;
  }>({});

  const handleRedirectToProfile = userid => {
    setIsUpdated(true);
    AsyncStorage.setItem('user', JSON.stringify({ ...user, userid: userid }));
    setTimeout(
      () =>
        navigation.reset({ index: 0, routes: [{ name: 'Profile' as never }] }),
      1000
    );
  };
  const handleSaveData = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (!storedUser) return console.log('No user stored');

    const userid = JSON.parse(storedUser).id;
    const { data: existingUser } = await getUserInfoFromId(userid);

    if (existingUser) {
      const { error } = await updateUser({ id: userid, ...user });
      if (!error) handleRedirectToProfile(userid);
    } else {
      const { error } = await saveUser({ userid: userid, ...user });
      if (!error) handleRedirectToProfile(userid);
    }
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
            onChangeText={text => setUser({ ...user, country: text })}
          />
          <Text style={styles.label}>Correo</Text>
          {/* <TextInput
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
          /> */}
          <Pressable
            style={styles.btn}
            onPress={handleSaveData}
            accessibilityLabel="Sign in button"
          >
            <Text style={styles.btnText}>{isUpdated ? '' : 'Guardar'}</Text>
            {isUpdated && (
              <Ionicons
                name="checkmark-circle-sharp"
                size={24}
                color={COLORS.primaryWhite}
              />
            )}
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
    marginTop: 32,
    display: 'flex',
    flexDirection: 'row',
    gap: 16
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
