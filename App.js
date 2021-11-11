import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import { globalContextWrapper } from "./contexts/GlobalContext";
import AdminPage from "./screens/AdminPage";
import CalendarPage from "./screens/CalendarPage";
import SettingsPage from "./screens/SettingsPage";
import LoginScreen from "./screens/LoginScreen";
import NotificationsPage from "./screens/NotificationsPage";
import TestPage2 from "./screens/TestPage2";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Tab = createBottomTabNavigator();

const AdminStack = createNativeStackNavigator();

function AdminStackScreen() {
  return (
    <AdminStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AdminStack.Screen name="Login" component={LoginScreen} />
      <AdminStack.Screen name="AdminFunctions" component={AdminPage} />
    </AdminStack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            } else if (route.name === "Admin") {
              iconName = focused
                ? "notifications-circle"
                : "notifications-circle-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        {/* <Tab.Screen name="Notifications" component={NotificationsPage} /> */}
        <Tab.Screen name="Test2" component={TestPage2} />
        <Tab.Screen name="Home" component={CalendarPage} />
        <Tab.Screen name="Settings" component={SettingsPage} />
        <Tab.Screen name="Admin" component={AdminStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default globalContextWrapper(App);
