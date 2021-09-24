import React from "react";
import { SafeAreaView, View, Text, Switch, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  container__item: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

const HorizontalDivider = function HorizontalDivider() {
  return (
    <View
      style={{
        alignSelf: "stretch",
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        marginHorizontal: 10,
        marginBottom: 20,
      }}
    />
  );
};

export default HorizontalDivider;
