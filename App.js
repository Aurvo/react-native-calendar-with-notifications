import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
//imported for React Navigation
import { NavigationContainer } from "@react-navigation/native";
//imported for native stack
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import CategoryPicker from "./CategoryPicker";
import AdminScreen from "./screens/AdminScreen";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* <CategoryPicker /> */}
      {/* <StatusBar style="auto" /> */}

      <TouchableOpacity onPress={() => navigation.push("AdminScreen")}>
        <Text>Admin</Text>
      </TouchableOpacity>
    </View>
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

//////////////////////////////////////////////////

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
