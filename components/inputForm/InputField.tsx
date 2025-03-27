import { Text, View, TextInput, StyleSheet } from "react-native";
import React from "react";
import colors from "@/lib/theme";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: "default" | "numeric";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label} </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        cursorColor={colors.callToAction}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: colors.primaryWhite,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primaryWhite,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: colors.primaryWhite,
  },
});

export default InputField;
