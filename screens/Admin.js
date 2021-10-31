import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
//import HorizontalDivider from "../components/HorizontalDivider";
import EventSection from './EventSection';
import PushNotification from "../components/PushNotification";

const Admin = function Admin({ navigation }) {

  return (
    <View>
      <ScrollView>
        <Text style={styles.heading__lg}>Notifications</Text>
        <EventSection />
        <PushNotification/>
      </ScrollView>
    </View>
  );
};

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

export default Admin;
