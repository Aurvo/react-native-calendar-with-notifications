import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
//imported for React Navigation
import { NavigationContainer } from "@react-navigation/native";
//imported for native stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Admin from "./screens/Admin";
import CalendarPage from "./screens/CalendarPage";
import SettingsPage from "./screens/SettingsPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});



const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >  
      <HomeStack.Screen name="Home" component={CalendarPage} />
      <HomeStack.Screen name="Settings" component={SettingsPage} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsPage} />
      <SettingsStack.Screen name="Admin" component={Admin} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
