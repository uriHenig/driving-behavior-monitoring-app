import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import colors from "@/app/utils/theme";

interface MenuButtonProps {
  onPress: () => void;
  isMenuOpen: boolean;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onPress, isMenuOpen }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={isMenuOpen ? styles.clickedMenuButtonContainer : styles.menuButtonContainer}
    >
      <Entypo name="menu" size={24} style={{ color: isMenuOpen ? colors.primaryWhite : colors.callToAction }} />
    </TouchableOpacity>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  menuButtonContainer: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  clickedMenuButtonContainer: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.callToAction,
  },
});
