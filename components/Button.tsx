import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "@/utils/theme";

interface ButtonProps {
  onPress: () => void;
  disabled?: boolean;
  text?: string;
  theme: "primary" | "secondary";
  style?: object;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onPress, disabled, text, theme = "primary", style, loading }) => {
  return (
    <TouchableOpacity
      style={[theme === "secondary" ? styles.secondaryButton : styles.primaryButton, style]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[theme === "secondary" ? styles.secondaryButtonText : styles.primaryButtonText, style]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#FF132A",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    borderWidth: 0.4,
    borderColor: colors.primaryWhite,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primaryWhite,
  },
  primaryButtonText: {
    color: colors.primaryWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButtonText: {
    color: "#666",
    fontSize: 16,
  },
});

export default Button;
