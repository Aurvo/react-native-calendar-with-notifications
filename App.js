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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {initializeApp} from 'firebase/app';
import { getAuth, signInAnonymously } from "firebase/auth";
import { auth, db} from "./firebase";


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
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
              }  
              else if (route.name === 'Admin') {
                iconName = focused ? 'notifications-circle' : 'notifications-circle-outline';
                }
            

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
        <Tab.Screen name="Admin" component={Admin} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
