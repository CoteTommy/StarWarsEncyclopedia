import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add types & storage keys
// export const storeData = async (key: string, value: any) => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem(key, jsonValue);
//   } catch (e) {
//     // saving error
//   }
// };

// export const getData = async (key: string) => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(key);
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//   }
// };

export const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log('🚀 ~ file: asyncStorageHelper.ts:33 ~ getData ~ key', key);
    console.log('🚀 ~ file: asyncStorageHelper.ts:33 ~ getData ~ value', value);
    console.log('🚀 ~ file: asyncStorageHelper.ts:33 ~ getData ~ value', value);
    if (value !== null) {
      // value previously stored
      return value.split(",");
    } else {
      return [];
    }
  } catch (e) {
    // error reading value
  }
};
