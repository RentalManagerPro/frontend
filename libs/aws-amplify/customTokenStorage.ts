import { KeyValueStorageInterface } from "aws-amplify/utils";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export class CustomTokenStorage implements KeyValueStorageInterface {
  async setItem(key: string, value: string): Promise<void> {
    // use local storage or secure storage depending on platform
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  }
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }
  async clear(): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.clear();
    } else {
      await SecureStore.deleteItemAsync("");
    }
  }
}
