import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { globalContextWrapper } from './contexts/GlobalContext';
import AdminPage from "./screens/Admin";
import CalendarPage from "./screens/CalendarPage";
import SettingsPage from "./screens/SettingsPage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Tab = createBottomTabNavigator();

const App = () => {
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
        <Tab.Screen name="Home" component={CalendarPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
        <Tab.Screen name="Admin" component={AdminPage} />
      </Tab.Navigator>
    </NavigationContainer>

  );
};

export default globalContextWrapper(App);
