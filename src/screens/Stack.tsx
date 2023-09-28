import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import LearningUnit from './LearningUnit';
import LearningPath from './LearningPath';
import Register from './forms/Register';
import Login from './forms/Login';
import CreateProject from './forms/CreateProject';
import { COLORS } from '../constants/colors';
import UserInfoForm from './forms/UserInfoForm';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.primaryWhite }
      }}
    >
      <Stack.Screen
        name="Roadmap"
        component={LearningPath}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateProject"
        component={CreateProject}
        options={{ headerTitle: '' }}
      />

      <Stack.Screen
        name="LearningUnit"
        component={LearningUnit}
        options={{ headerTitle: '' }}
      />
    </Stack.Navigator>
  );
}

export function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.primaryWhite }
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfoForm}
        options={{ headerTitle: 'Editar perfil' }}
      />
    </Stack.Navigator>
  );
}

export function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.primaryWhite }
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerTitle: 'Crea tu cuenta' }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
