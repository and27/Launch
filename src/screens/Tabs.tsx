import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Profile from './Profile';
import Modules from './Modules';
import MyStack from './Stack';
import Login from './Login';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Launch"
        component={MyStack}
        options={{
          tabBarActiveTintColor: '#000',
          tabBarLabel: 'Progreso',
          headerShown: false,
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
        name="Módulos"
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

export default function Navigation({ isSignedIn }) {
  return (
    <NavigationContainer>
      {isSignedIn ? <MyTabs /> : <Login />}
    </NavigationContainer>
  );
}
