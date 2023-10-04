import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LearningUnit from './LearningUnit';
import Register from './forms/Register';
import Login from './forms/Login';
import CreateProject from './forms/CreateProject';
import { COLORS } from '../constants/colors';
import UserInfoForm from './forms/UserInfoForm';
import { MyTabs } from './Tabs';

const Stack = createNativeStackNavigator();

export function LearningPathStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Roadmap"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateProject"
        component={CreateProject}
        options={{ headerTitle: 'Nuevo Proyecto' }}
      />
      <Stack.Screen
        name="LearningUnit"
        component={LearningUnit}
        options={{ headerTitle: '' }}
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
        headerStyle: {
          backgroundColor: COLORS.primaryWhite
        },
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
