import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "@/app/utils/theme";

const MenuContainer = () => {
  return (
    <View style={styles.menuContainer}>
      <Text>MenuContainer</Text>
    </View>
  );
};

export default MenuContainer;

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: colors.background,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
