import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import Modules from './Modules';
import LearningUnit from './LearningUnit';
import Roadmap from './Roadmap';
import SignIn from './SignIn';
import Login from './Login';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Roadmap"
        component={Roadmap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LearningUnit"
        component={LearningUnit}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Modules" component={Modules} />
    </Stack.Navigator>
  );
}

export function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: ''
        }}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
