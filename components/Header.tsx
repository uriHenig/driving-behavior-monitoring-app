import { Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import colors from "@/app/utils/theme";
import { BlurView } from "expo-blur";
import MenuButton from "./MenuButton";
import MenuContainer from "./MenuContainer";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    console.log("i was opened");
    setShowMenu((prev) => !prev);
  };

  return (
    <BlurView intensity={100} tint="light" style={styles.blurContainer}>
      <View style={styles.header}>
        <Link href={"/"}>
          <Image
            source={{
              uri: "https://cdn.prod.website-files.com/65381fa7067c778a5cb91973/653bb31378999636f0f1fb3d_LETSTOP%20LOGO.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />{" "}
        </Link>
        <MenuButton onPress={openMenu} isMenuOpen={showMenu} />
      </View>
      {showMenu && <MenuContainer />}
    </BlurView>

    //     <View style={styles.menuContainer}>
    //       <Link href={"/"} style={styles.submitButton}>
    //         Home
    //       </Link>
    //       <Link href={"/history"} style={styles.submitButton}>
    //         History
    //       </Link>
    //     </View>
    //   )}
  );
};

export default Header;

const styles = StyleSheet.create({
  blurContainer: {
    width: "100%",
    top: 0,
    left: 0,
  },
  header: {
    backgroundColor: colors.background,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    opacity: 0.98,
  },
  logo: {
    width: 200,
    height: 100,
  },
});
