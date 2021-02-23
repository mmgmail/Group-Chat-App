//This file contains all the routes

import "react-native-gesture-handler"; //IMPPPP
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
//Making global styling for all sceens
globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};
const Stack = createStackNavigator(); //creating stack navigation
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name="LOGIN" component={LoginScreen} />
        <Stack.Screen name="REGISTER" component={RegisterScreen} />
        <Stack.Screen name="HOME" component={HomeScreen} />
        <Stack.Screen name="ADD_CHAT_SCREEN" component={AddChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
