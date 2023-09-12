import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Profile from './Profile';
import Modules from './Modules';
import MyStack, { LoginStack } from './Stack';
import Login from './Login';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Launch"
        component={MyStack}
        options={{
          tabBarActiveTintColor: '#000',
          tabBarLabel: 'Roadmap',
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
        component={Modules}
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
      {isLoggedIn ? <MyTabs /> : <LoginStack />}
    </NavigationContainer>
  );
}
