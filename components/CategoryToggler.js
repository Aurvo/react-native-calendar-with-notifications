import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

const Toggler = ({
  category,
  selectedCategories,
  onSelectedCategoriesChange,
}) => {
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

  function updateSelectedCategories(category) {
    let t_selectedCategories = [...selectedCategories];

    t_selectedCategories.forEach((t_category) => {
      if (t_category.category_id === category.category_id) {
        let index = t_selectedCategories.findIndex(
          (element) => element.category_id === category.category_id
        );
        t_selectedCategories[index] = {
          category_id: category.category_id,
          category_name: category.category_name,
          isSubscribed: !category.isSubscribed,
        };
        console.log(
          "finished updating selectedCategories with new isSubscribed"
        );
      }
    });

    return t_selectedCategories;
  }

  return (
    <View style={styles.group}>
      <Text style={styles.group__item_text} key={category.category_name}>
        {" "}
        {category.category_name}{" "}
      </Text>
      <Switch
        key={`${category.category_name}___switch`}
        value={category.isSubscribed}
        onChange={(e) =>
          onSelectedCategoriesChange(updateSelectedCategories(category))
        }
        trackColor={{ true: "green" }}
      ></Switch>
    </View>
  );
};

const CategoryToggler = function CategoryToggler({
  selectedCategories,
  onSelectedCategoriesChange,
}) {
  const togglerList = selectedCategories.map((category) => {
    return (
      <Toggler
        category={category}
        selectedCategories={selectedCategories}
        onSelectedCategoriesChange={onSelectedCategoriesChange}
      />
    );
  });

  // togglerList.forEach((t) => console.log(t));

  return <View>{togglerList}</View>;
};

export default CategoryToggler;
