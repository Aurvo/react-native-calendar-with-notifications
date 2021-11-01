import React from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  Text,
  Switch,
  StyleSheet,
} from "react-native";
import SendMessage from "../components/SendMessage";
<<<<<<< HEAD:screens/AdminPage.js
import CategoryToggler from "../components/CategoryToggler";
=======
import EventSection from './EventSection';
>>>>>>> accd5dcd819c3d636280faca3711980ab355cf9f:screens/Admin.js

const AdminPage = () => {
  // const [isDonorEnabled, setDonor] = React.useState(false);
  // const [isVolunteerEnabled, setVolunteer] = React.useState(false);
  // const [isClientEnabled, setClient] = React.useState(false);
  // const [isHostEnabled, setHost] = React.useState(false);

  return (
    <View>
      <ScrollView>
        <Text style={styles.heading__lg}>Notifications</Text>
        <Text style={styles.subheading}>
          Turn on or off the push notifications that are sent to each
          subscription group.
        </Text>

        <CategoryToggler />

        {/* <View style={styles.group}>
          <Text style={styles.group__item_text}>Donor</Text>
          <View style={styles.group__item_text}>
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
        </View> */}

        {/* <HorizontalDivider /> */}

        <Text style={[styles.group__item_text, { padding: 10 }]}>
          Message To Subscribers
        </Text>
        <SendMessage />
<<<<<<< HEAD:screens/AdminPage.js
=======

        <HorizontalDivider />
        <EventSection />
        <HorizontalDivider />
>>>>>>> accd5dcd819c3d636280faca3711980ab355cf9f:screens/Admin.js
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

export default AdminPage;
