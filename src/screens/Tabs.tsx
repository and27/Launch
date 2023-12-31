import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Libary from './Library';
import { LearningPathStack, LoginStack } from './Stack';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import LearningPath from './LearningPath';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Launch"
        component={LearningPath}
        options={{
          tabBarActiveTintColor: '#000',
          tabBarLabel: 'Ruta',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="rocket-outline"
              size={24}
              color={focused ? 'black' : '#777'}
              tabBarActiveTintColor="red"
            />
          )
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarActiveTintColor: '#000',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? 'black' : '#777'}
            />
          )
        }}
      />
      <Tab.Screen
        name="Biblioteca"
        component={Libary}
        options={{
          tabBarActiveTintColor: '#000',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="list"
              size={24}
              color={focused ? 'black' : '#777'}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? <LearningPathStack /> : <LoginStack />}
    </NavigationContainer>
  );
}
