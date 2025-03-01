import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    try {
      const token = await AsyncStorage.getItem(`${this.namespace}:token`);
      return token;
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    try {
      await AsyncStorage.setItem(`${this.namespace}:token`, await accessToken);
    } catch (error) {
      console.log(error);
    }
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    try {
      await AsyncStorage.removeItem(`${this.namespace}:token`);
    } catch (error) {
      console.log(error);
    }

    return "token removed from local storage";
  }
}

export default AuthStorage;
