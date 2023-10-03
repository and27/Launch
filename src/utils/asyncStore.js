import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeDataLocally = async ({ key, value }) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getUserIdFromLocalStorage = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    const userParsed = JSON.parse(user);
    return { data: userParsed.id };
  } catch (e) {
    return { error: e };
  }
};
