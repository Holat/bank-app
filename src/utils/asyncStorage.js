import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    const strigifiedObj = JSON.stringify(value);
    await AsyncStorage.setItem(key, strigifiedObj);
    console.log(`Data with key "${key}" stored successfully.`);
  } catch (error) {
    console.error(`Error storing data: ${error}`);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const parsedObj = JSON.parse(value);
      return parsedObj;
    } else {
      console.log(`No value found for key "${key}".`);
      return null;
    }
  } catch (error) {
    console.error(`Error retrieving data: ${error}`);
    return null;
  }
};

export { storeData, getData };
