import { StatusBar } from 'expo-status-bar';
import Navigation from './src/screens/Tabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const getData = async key => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleGetData = async () => {
      const user = await getData('user');
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    };

    handleGetData();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Navigation isSignedIn={isSignedIn} />
    </>
  );
}
