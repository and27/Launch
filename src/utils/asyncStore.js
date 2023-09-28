import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataLocally = async ({ key, value }) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
