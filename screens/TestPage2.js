import React, { useContext, useState } from "react";
import {
  FlatList,
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  VirtualizedList,
  ScrollView,
} from "react-native";
import { GlobalContext } from "../contexts/GlobalContext";
import SendMessage2 from "../components/SendMessage2";
import HorizontalDivider from "../components/HorizontalDivider";

const TestPage2 = () => {
  const { categories } = useContext(GlobalContext);

  let names = [];

  categories.forEach((category) => {
    names.push({
      name: category.label,
      isSubscribed: false,
    });
  });

  function setIsSubscribed(name) {
    let index = names.findIndex((element) => element.name == name);
    names[index].isSubscribed = !names[index].isSubscribed;
    console.log("found it: " + names[index].name);
    console.log("name.isSubscribed: " + names[index].isSubscribed);
  }

  return (
    <ScrollView>
      <FlatList
        style={{ padding: 20 }}
        data={names}
        keyExtractor={({ name }) => {
          return name;
        }}
        renderItem={({ item }) => (
          <Group
            name={item.name}
            isSubscribed={item.isSubscribed}
            setIsSubscribed={setIsSubscribed}
          />
        )}
      />
      <HorizontalDivider />

      <SendMessage2 />
    </ScrollView>
  );
};

const Group = (props) => {
  const [isEnabled, setIsEnabled] = useState(props.isSubscribed);
  //   console.log(props.isSubscribed);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    props.setIsSubscribed(props.name);
    // console.log("isSubscribed: " + props.isSubscribed);
    // props.displayNames();
  };

  return (
    <View style={styles.group}>
      <GroupTitle name={props.name} />
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const GroupTitle = (props) => {
  return <Text style={styles.group__item_text}>{props.name}</Text>;
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
export default TestPage2;
