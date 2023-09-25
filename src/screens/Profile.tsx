import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, Pressable } from 'react-native';
import ProfileUser from './ProfileUser';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getUserInfoFromId } from '../utils/supabase';
import { COLORS } from '../constants/colors';
import { AuthContext } from '../context/authContext';

const img = require('../../assets/abstract/abstract7.jpg');

interface IUserSectionProps {
  title: string;
  items: Array<{ title: string; subtitle?: string }>;
  extendable?: boolean;
}

const UserSection: React.FC<IUserSectionProps> = ({
  title,
  items,
  extendable
}) => {
  const navigation = useNavigation();

  const handleShowProjectForm = () => {
    navigation.navigate('CreateProject' as never);
  };

  return (
    <View style={styles.section}>
      <Text>{title}</Text>
      <View style={styles.userSectionContainer}>
        {items.map((item, index) => (
          <View style={styles.userSectionCard} key={index}>
            <Image source={img} style={styles.userSectionImg} />
            <View>
              <Text>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.userSectionSubtitle}>{item.subtitle}</Text>
              )}
            </View>
          </View>
        ))}
        {extendable && (
          <Pressable
            style={styles.userSectionCard}
            onPress={handleShowProjectForm}
          >
            <Ionicons name="add-outline" size={18} color="black" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default function Profile() {
  const [userInfo, setUserInfo] = useState<{
    id: string;
    name: string;
    country?: string;
  }>({
    id: '',
    name: ''
  });
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const getUserInfo = async () => {
    const localUserInfo = await AsyncStorage.getItem('user');
    if (!localUserInfo) return setIsLoggedIn(false);
    setUserInfo(JSON.parse(localUserInfo));

    //todo: if the user updated their info, we need to update it here
    //handle this when user opens the app
    const result = await getUserInfoFromId(userInfo?.id);
    if (result?.data?.length === 0)
      //this should not occur in the future if we store the user info in the corresponding user table
      return console.log('No user found with that id');
    const user = result?.data[0];
    setUserInfo({ id: user.id, name: user.name, country: user.country });
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.setItem('user', '');
      setIsLoggedIn(false);
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate('UserInfo' as never);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <ProfileUser item={userInfo} />
        <Button title="Editar perfil" onPress={handleEditProfile} />
        <View style={styles.containerInner}>
          <View style={styles.goal}>
            <Text>
              My mission is to create 100 social projects by 2040 and
              collaborate with people around the world.
            </Text>
          </View>
          <UserSection
            title="Proyectos"
            items={[{ title: 'Project P', subtitle: 'Educación' }]}
            extendable
          />
          <UserSection
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryWhite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 32,
    paddingBottom: 36
  },

  containerInner: {
    display: 'flex',
    alignItems: 'flex-start',
    marginVertical: 24
  },

  title: {
    fontSize: 18,
    marginBottom: 8
  },

  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch'
  },

  section: {
    marginTop: 24
  },

  userSectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    flexWrap: 'wrap'
  },

  userSectionCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: COLORS.fullWhite,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  goal: {
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },

  userSectionImg: {
    width: 32,
    height: 32,
    borderRadius: 100,
    marginRight: 8
  },

  userSectionSubtitle: {
    fontSize: 12,
    color: COLORS.darkGrey
  }
});
