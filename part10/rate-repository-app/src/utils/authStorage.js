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

    console.log(
      "(FROM: Context_setAccessToken) the accessToken is: ",
      accessToken
    );

    try {
      await AsyncStorage.setItem(`${this.namespace}:token`, accessToken);
    } catch (error) {
      console.log(error);
    }

    return "token set";
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    try {
      await AsyncStorage.clear(); //${this.namespace}:token
    } catch (error) {
      console.log(error);
    }

    return "token removed from local storage";
  }
}

export default AuthStorage;
