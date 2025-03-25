import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, ImageBackground } from "react-native";
import InputField from "@/components/InputField";
import colors from "./utils/theme";
import Header from "@/components/Header";
import DrivingResultDisplay from "@/components/DrivingResultDisplay";
import Button from "@/components/Button";

const API_URL = "http://192.168.43.106:5000";

// Todo:
// 1. fix history GET command in server

// 7. API_URL should be in a config file

interface DrivingData {
  driverId: string;
  acceleration: number;
  braking: number;
  turn: number;
}

interface DrivingResponse extends DrivingData {
  isFlagged: boolean;
  timestamp: string;
  sustainabilityScore: string;
}

export default function Index() {
  const [driverId, setDriverId] = useState("driver123");
  const [acceleration, setAcceleration] = useState("");
  const [braking, setBraking] = useState("");
  const [turn, setTurn] = useState("");

  const [result, setResult] = useState<DrivingResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitDrivingData = async () => {
    setLoading(true);
    setError("");
    console.log("submitted");

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

      const response = await fetch(`${API_URL}/monitor-behavior`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setResult(responseData);
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
    setResult(null);
    setError("");
  };

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <Header />

      <ImageBackground
        source={{
          uri: "https://cdn.prod.website-files.com/65381fa7067c778a5cb91973/658456acfeca5d5213dd2bbb_Phone%20background-1.png",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <Text style={styles.title}>Braking bad habits Together.</Text>

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
      </ImageBackground>
      {result && <DrivingResultDisplay result={result} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    marginTop: 10,
    color: colors.title,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  inputContainer: {
    margin: 16,
    padding: 16,
    elevation: 2,
  },
  backgroundImage: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  navigationContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  link: {
    padding: 8,
  },
  linkText: {
    color: "#FF132A",
    fontSize: 16,
  },
  errorText: {
    color: "#F44336",
    marginBottom: 16,
  },
});
