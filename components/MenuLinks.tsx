import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/utils/theme";

const MenuLinks = () => {
  return (
    <View style={styles.links}>
      <Link href={"/"} style={styles.homeLink}>
        Home
      </Link>
      <Link href={"/#"} style={styles.link}>
        How It Works
      </Link>
      <Link href={"/#"} style={styles.link}>
        Token
      </Link>
      <Link href={"/#"} style={styles.link}>
        FAQ
      </Link>
      <Link href={"/#"} style={styles.link}>
        Contact
      </Link>
      <Link href={"/#"} style={styles.link}>
        Whitepaper
      </Link>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Language</Text>
        <AntDesign name="down" style={styles.downArrow} />
      </View>
      <Link href={"/#"} style={styles.getStartedLink}>
        Get Started & Earn
      </Link>
    </View>
  );
};

export default MenuLinks;

const styles = StyleSheet.create({
  links: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "60%",
    width: "100%",
  },
  link: {
    color: colors.primaryWhite,
    textDecorationLine: "none",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    color: colors.callToAction,
    paddingRight: 3,
  },
  downArrow: {
    color: colors.callToAction,
    fontWeight: "bold",
  },
  homeLink: {
    backgroundColor: "#FF132A",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    color: colors.primaryWhite,
  },
  getStartedLink: {
    backgroundColor: "#FF132A",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: colors.primaryWhite,
    color: colors.primaryWhite,
  },
});
