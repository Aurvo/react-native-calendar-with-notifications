import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Switch,
  StyleSheet,
} from "react-native";
import HorizontalDivider from "../components/HorizontalDivider";
import EventScreen from './EventScreen';

const Admin = function Admin({ navigation }) {
  const [isDonorEnabled, setDonor] = React.useState(false);
  const [isVolunteerEnabled, setVolunteer] = React.useState(false);
  const [isClientEnabled, setClient] = React.useState(false);
  const [isHostEnabled, setHost] = React.useState(false);

  return (
    <View>
      <ScrollView>
        <Text style={styles.heading__lg}>Notifications</Text>
        <Text style={styles.subheading}>
          Turn on or off the push notifications that are sent to each
          subscription group.
        </Text>
        <View style={styles.group}>
          <Text style={styles.group__item_text}>Donor</Text>
          <View style={[styles.group__item_text, { flexDirection: "row" }]}>
            <Switch
              value={isDonorEnabled}
              onValueChange={(value) => setDonor(value)}
              trackColor={{ true: "green" }}
            ></Switch>
          </View>
        </View>
        <HorizontalDivider />
        <View style={styles.group}>
          <Text style={styles.group__item_text}>Volunteer</Text>
          <Switch
            value={isVolunteerEnabled}
            onValueChange={(value) => setVolunteer(value)}
            trackColor={{ true: "green" }}
          ></Switch>
        </View>
        <HorizontalDivider />
        <View style={styles.group}>
          <Text style={styles.group__item_text}>Client</Text>
          <Switch
            value={isClientEnabled}
            onValueChange={(value) => setClient(value)}
            trackColor={{ true: "green" }}
          ></Switch>
        </View>
        <HorizontalDivider />
        <View style={styles.group}>
          <Text style={styles.group__item_text}>Host</Text>
          <Switch
            value={isHostEnabled}
            onValueChange={(value) => setHost(value)}
            trackColor={{ true: "green" }}
          ></Switch>
        </View>
        <EventScreen />
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
