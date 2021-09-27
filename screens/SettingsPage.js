import React from "react";
import { render } from "react-dom";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import CategoryPicker from "../components/CategoryPicker";


const userCategories = ['Donor', 'Volunteer', 'Client','Host'];



const SettingsPage = () => {
  return(
    <SafeAreaView>
      <Text style={styles.subheading}>Identify which group notifications you would like to receive.</Text>
      <View style={styles.subheading}>
        <CategoryPicker selectedCategories= {[]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    heading__lg: {
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 5,
      fontSize: 30,
      fontWeight: "bold",
    },
    subheading: {
      padding: 10,
      marginBottom: 25,
    },
    group: {
      padding: 10,
      marginBottom: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    group__item_text: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  
  export default SettingsPage;