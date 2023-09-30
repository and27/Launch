import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Pressable,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getUserInfoFromId } from '../utils/supabase';
import { COLORS } from '../constants/colors';
import { AuthContext } from '../context/authContext';
import TYPOGRAPHY from '../constants/typography';
import SPACING from '../constants/spacing';
import { globalStyles } from '../globalStyles/global';
import UserProfileInfo from '../components/UserProfileInfo';
import { storeDataLocally } from '../utils/asyncStore';

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
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContainer}>
        {items.map((item, index) => (
          <View style={styles.sectionCard} key={index}>
            <Image source={img} style={styles.userSectionImg} />
            <View>
              <Text style={styles.sectionCardTitle}>{item.title}</Text>
              {item.subtitle && (
                <Text style={styles.sectionCardSubtitle}>{item.subtitle}</Text>
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

    const { data } = await getUserInfoFromId(userInfo?.id);
    if (!data) return console.log('No user found with that id');
    const user = data[0];
    setUserInfo({ id: user.id, name: user.name, country: user.country });
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
    getUserInfo();
  }, []);

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
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get('window').width;

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

  section: {
    marginBottom: SPACING.large
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.baseText,
    color: COLORS.darkGrey,
    marginBottom: SPACING.small
  },

  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
    flexWrap: 'wrap'
  },

  sectionCard: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 8,
    padding: 8,
    backgroundColor: COLORS.fullWhite,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  sectionCardTitle: {
    fontSize: TYPOGRAPHY.baseText,
    fontWeight: '600',
    color: COLORS.darkGrey
  },

  sectionCardSubtitle: {
    fontSize: TYPOGRAPHY.noteText,
    color: COLORS.darkGrey
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
  },

  userSectionImg: {
    width: 32,
    height: 32,
    borderRadius: 100,
    marginRight: 8
  }
});
