import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import ProfileUser from './ProfileUser';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfoFromId } from '../supabase';
import { COLORS } from '../colors';

const UserSection = ({ title, items }) => (
  <View style={styles.section}>
    <Text>{title}</Text>
    <View style={styles.projects}>
      {items.map((item, index) => (
        <View style={styles.card} key={index}>
          <Text>{item}</Text>
        </View>
      ))}
    </View>
  </View>
);

export default function Profile() {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    const id = await AsyncStorage.getItem('user');
    const result = await getUserInfoFromId(id);
    const user = result?.data[0];
    setUserInfo({ name: user.name, country: user.country });
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.setItem('user', '');
    } catch (exception) {
      console.log(exception);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  console.log(userInfo);
  if (!userInfo) return;

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <ProfileUser item={userInfo} />
        <View style={styles.containerInner}>
          <View style={styles.goal}>
            <Text>
              My mission is to create 100 social projects by 2040 and
              collaborate with people around the world.
            </Text>
          </View>
          <UserSection title="Proyectos" items={['Project P']} />
          <UserSection title="Equipo" items={['Ab', 'Bc']} />
          <UserSection
            title="Logros"
            items={['Completar una idea', 'Crear un prototipo']}
          />
        </View>
        <Button title="Sign out" onPress={handleSignOut} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 32,
    paddingBottom: 36
  },
  containerInner: {
    display: 'flex',
    alignItems: 'flex-start'
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
  projects: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    flexWrap: 'wrap'
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: COLORS.primaryWhite
  },
  goal: {
    alignSelf: 'center',
    textAlign: 'center',
    shadowColor: '#555',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#555',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryWhite,
    padding: 16,
    minHeight: 90
  }
});
