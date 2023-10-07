import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { getUserInfoFromId } from '../utils/supabase';
import { COLORS } from '../constants/colors';
import { AuthContext } from '../context/authContext';
import TYPOGRAPHY from '../constants/typography';
import SPACING from '../constants/spacing';
import UserProfileInfo from '../components/UserProfileInfo';
import {
  getUserIdFromLocalStorage,
  storeDataLocally
} from '../utils/asyncStore';
import UserProfileCard from '../components/UserProfileCard';

export type userInfo = {
  id?: string;
  name?: string;
  country?: string;
};

export default function Profile() {
  const isFocused = useIsFocused();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<userInfo>({});

  const getUserInfo = async () => {
    const { data: userId } = await getUserIdFromLocalStorage();
    if (!userId) return console.error('No user found locally');

    const { data } = await getUserInfoFromId(userId);
    if (!data) return console.error('No user found with that id');

    const userRaw = data[0];
    const user = {
      name: userRaw.name,
      country: userRaw.country
    };

    return user;
  };

  const updateUserInfo = async () => {
    const user = await getUserInfo();
    setUserInfo(prev => ({ ...prev, ...user }));

    const previousUserData = await AsyncStorage.getItem('user');
    const previousUserDataParsed = JSON.parse(previousUserData);
    storeDataLocally({
      key: 'user',
      value: JSON.stringify({ ...previousUserDataParsed, ...user })
    });
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      storeDataLocally({ key: 'user', value: '' });
      setIsLoggedIn(false);
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    updateUserInfo();
  }, [isFocused]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <UserProfileInfo item={userInfo} />

        <View style={styles.containerInner}>
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>
              My mission is to create 100 social projects by 2040 and
              collaborate with people around the world.
            </Text>
          </View>
          <UserProfileCard
            title="Proyectos"
            items={[{ title: 'Project P', subtitle: 'Educación' }]}
            extendable
          />
          <UserProfileCard
            title="Logros"
            items={[
              { title: 'Completar una idea' },
              { title: 'Crear un prototipo' }
            ]}
          />
        </View>

        <Button
          title="Cerrar sesión"
          onPress={handleSignOut}
          color={COLORS.primaryBlack}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryWhite,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: SPACING.medium,
    minHeight: '100%'
  },

  containerInner: {
    display: 'flex',
    alignItems: 'flex-start',
    marginVertical: 24
  },

  title: {
    fontSize: TYPOGRAPHY.extraLargeTitle,
    marginBottom: SPACING.large,
    color: COLORS.primaryBlack
  },

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },

  bioContainer: {
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.large,
    fontSize: TYPOGRAPHY.baseText
  },

  bioText: {
    fontSize: TYPOGRAPHY.baseText,
    color: COLORS.darkGrey
  }
});
