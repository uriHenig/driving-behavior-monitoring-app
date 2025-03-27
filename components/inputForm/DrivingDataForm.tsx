import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import InputField from "@/components/inputForm/InputField";
import Button from "@/components/inputForm/Button";
import { DrivingData, DrivingResponse } from "@/lib/types";
import { api } from "@/utils/api";

interface DrivingDataFormProps {
  onSubmitResult: (result: DrivingResponse | null) => void;
}

export default function DrivingDataForm({ onSubmitResult }: DrivingDataFormProps) {
  const [driverId, setDriverId] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [braking, setBraking] = useState("");
  const [turn, setTurn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitDrivingData = async () => {
    setLoading(true);
    setError("");

    if (!acceleration || !braking || !turn) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const data: DrivingData = {
        driverId,
        acceleration: parseFloat(acceleration),
        braking: parseFloat(braking),
        turn: parseFloat(turn),
      };

      if (isNaN(data.acceleration) || isNaN(data.braking) || isNaN(data.turn)) {
        setError("All values must be valid numbers");
        setLoading(false);
        return;
      }

      const responseData = await api.submitDrivingData(data);
      onSubmitResult(responseData);
    } catch (err) {
      setError(`Failed to submit data: ${err instanceof Error ? err.message : "Unknown error"}`);
      Alert.alert("Error", "Failed to submit driving data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAcceleration("");
    setBraking("");
    setTurn("");
    onSubmitResult(null);
    setError("");
  };
  return (
    <View style={styles.inputContainer}>
      <InputField label="Driver ID" value={driverId} onChangeText={setDriverId} placeholder="Enter driver ID" />
      <InputField
        label="Acceleration (m/s²)"
        value={acceleration}
        onChangeText={setAcceleration}
        placeholder="Enter acceleration"
        keyboardType="numeric"
      />
      <InputField
        label="Braking (m/s²)"
        value={braking}
        onChangeText={setBraking}
        placeholder="Enter braking"
        keyboardType="numeric"
      />
      <InputField
        label="Turn (m/s²)"
        value={turn}
        onChangeText={setTurn}
        placeholder="Enter turn"
        keyboardType="numeric"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button
          theme="primary"
          onPress={submitDrivingData}
          disabled={loading}
          loading={loading}
          text="Submit"
          style={{ flex: 0.7 }}
        />
        <Button theme="secondary" onPress={resetForm} disabled={loading} text="Reset" style={{ flex: 0.25 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    margin: 16,
    padding: 16,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  errorText: {
    color: "#F44336",
    marginBottom: 16,
  },
});
