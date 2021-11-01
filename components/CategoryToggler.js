import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import HorizontalDivider from "../components/HorizontalDivider";
import { GlobalContext } from "../contexts/GlobalContext";

const CategoryToggler = function CategoryToggler() {
  const names = [];
  const { categories } = useContext(GlobalContext);

  categories.forEach((element, index) => {
    // console.log(element.label);
    // console.log(index);
    names[index] = element.label;
  });

  return names.map((name, index) => {
    const [isGroupEnabled, setGroup] = React.useState(false);

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

    return (
      <View>
        <View style={styles.group}>
          <Text style={styles.group__item_text}>{name}</Text>
          <View style={styles.group__item_text}>
            <Switch
              value={isGroupEnabled}
              onValueChange={(value) => setGroup(value)}
              trackColor={{ true: "green" }}
            ></Switch>
          </View>
        </View>
        <HorizontalDivider />
      </View>
    );
  });
};

export default CategoryToggler;
