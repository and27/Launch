import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import { formStyles } from '../../globalStyles/forms';
import { globalStyles } from '../../globalStyles/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfoFromId, saveUser, updateUser } from '../../utils/supabase';
import { COLORS } from '../../constants/colors';
import SPACING from '../../constants/spacing';
import { storeDataLocally } from '../../utils/asyncStore';

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
    storeDataLocally({
      key: 'user',
      value: JSON.stringify({ ...user, userid: userid })
    });
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
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
