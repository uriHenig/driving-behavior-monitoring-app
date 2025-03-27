import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import colors from "@/lib/theme";

const MenuLinks = () => {
  const links = [
    { label: "How It Works" },
    { label: "Token" },
    { label: "FAQ" },
    { label: "Contact" },
    { label: "Whitepaper" },
  ];
  return (
    <View style={styles.links}>
      <Link href={"/"} style={styles.buttonLink}>
        Home
      </Link>
      {links.map((link, index) => (
        <Link key={index} href={"/#"} style={styles.link}>
          {link.label}
        </Link>
      ))}
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>Language</Text>
        <AntDesign name="down" style={styles.downArrow} />
      </View>
      <Link href={"/#"} style={[styles.buttonLink, styles.buttonBorder]}>
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
  buttonLink: {
    backgroundColor: "#FF132A",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    color: colors.primaryWhite,
  },
  buttonBorder: {
    borderColor: colors.primaryWhite,
    borderWidth: 0.4,
  },
});
