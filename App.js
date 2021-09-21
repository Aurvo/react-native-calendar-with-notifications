import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//imported for React Navigation
import { NavigationContainer } from '@react-navigation/native';
//imported for native stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryPicker from './CategoryPicker'



function HomeScreen() {
  return (
    <View style={styles.container}>
      <CategoryPicker />
      <StatusBar style="auto"/>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
