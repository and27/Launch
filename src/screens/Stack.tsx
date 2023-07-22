import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import Modules from './Modules';
import Learning from './Learning';
import LearningUnit from './LearningUnit';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Progreso"
        component={Learning}
        options={{ headerTitle: 'Mi progreso' }}
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

export default MyStack;
