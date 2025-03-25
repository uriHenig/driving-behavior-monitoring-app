import { Animated, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import colors from "@/app/utils/theme";
import MenuLinks from "./MenuLinks";

interface MenuContainerProps {
  isVisible: boolean;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ isVisible }) => {
  const screenHeight = Dimensions.get("window").height;
  const menuAnimation = useRef(new Animated.Value(-screenHeight)).current;

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: isVisible ? 0 : -screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  return (
    <Animated.View style={[styles.menuContainer, { transform: [{ translateY: menuAnimation }] }]}>
      <MenuLinks />
    </Animated.View>
  );
};

export default MenuContainer;

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: colors.background,
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
