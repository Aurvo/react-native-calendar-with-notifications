import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";
//imported for React Navigation
import { NavigationContainer } from "@react-navigation/native";
//imported for native stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryPicker from "./CategoryPicker";
import Admin from "./screens/Admin";
import CalendarPage from "./screens/CalendarPage";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <CategoryPicker />
      <StatusBar style="auto" />

      <TouchableOpacity onPress={() => navigation.push("Admin")}>
        <Text>Admin</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("Calendar")}>
        <Text>Calendar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Calendar" component={CalendarPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
