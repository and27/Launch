import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Pressable,
  SafeAreaView
} from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';
import { getUserInfoFromId, saveUser, updateUser } from '../../utils/supabase';
import { COLORS } from '../../constants/colors';
import SPACING from '../../constants/spacing';
import {
  getUserIdFromLocalStorage,
  storeDataLocally
} from '../../utils/asyncStore';
import { userInfo } from '../Profile';

const windowWidth = Dimensions.get('window').width;

export default function UserInfoForm() {
  const navigation = useNavigation();
  const [isUpdated, setIsUpdated] = useState(false);
  const [user, setUser] = React.useState<userInfo>({});

  useEffect(() => {
    const getPreviousUserInfo = async () => {
      const data = await AsyncStorage.getItem('user');
      setUser(JSON.parse(data));
    };

    getPreviousUserInfo();
  }, []);

  const handleRedirectToProfile = userid => {
    setIsUpdated(true);
    storeDataLocally({
      key: 'user',
      value: JSON.stringify({ ...user, id: userid })
    });
    setTimeout(() => navigation.goBack(), 1000);
  };

  const handleSaveData = async () => {
    const { data: userid, error } = await getUserIdFromLocalStorage();
    if (error) return console.error(error);

    const { data: existingUser } = await getUserInfoFromId(userid);

    if (existingUser?.length > 0) {
      const { error } = await updateUser({ id: userid, ...user });
      if (!error) handleRedirectToProfile(userid);
    } else {
      const { error } = await saveUser({ userid: userid, ...user });
      if (!error) handleRedirectToProfile(userid);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={user.name}
          onChangeText={text => setUser({ ...user, name: text })}
        />
        <Text>País</Text>
        <TextInput
          style={styles.input}
          placeholder="País"
          value={user.country}
          onChangeText={text => setUser({ ...user, country: text })}
        />
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
    </SafeAreaView>
  );
}

const formGlobalStyles = formStyles;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screenContainer,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: SPACING.large
  },

  title: {
    ...globalStyles.title,
    marginBottom: 40
  },

  input: {
    ...formGlobalStyles.input,
    width: windowWidth - 40,
    marginBottom: SPACING.medium
  },

  btn: {
    ...formGlobalStyles.btnPrimary,
    marginTop: 32,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    width: windowWidth - 40
  },

  btnText: {
    ...formGlobalStyles.btnPrimaryText
  },

  label: {
    marginTop: 24
  }
});
