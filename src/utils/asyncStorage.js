import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    const strigifiedObj = JSON.stringify(value);
    await AsyncStorage.setItem(key, strigifiedObj);
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

const setPref = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Error storing data: ${error}`);
  }
};

const getPref = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      console.log("No value for the key was found");
      return null;
    }
  } catch (error) {
    console.log("Error retrieving data");
    return null;
  }
};

export { storeData, getData, getPref, setPref };
