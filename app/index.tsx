import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { Image } from "react-native";
import InputField from "@/components/InputField";
import colors from "./utils/theme";
import Entypo from "@expo/vector-icons/Entypo";

const API_URL = "http://192.168.43.106:5000";

// Todo:
// 1. fix history GET command in server
// 2. break ap down into components - button, input, header
// 3. style images like the expo tutorial
// 4. make result div look like a stop sign
// 5. wrap the app in the background image
// 6. add hamburger menu
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
  const [showMenu, setShowMenu] = useState(false);

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

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "#4CAF50"; // Good - Green
    if (score >= 0.5) return "#FFC107"; // Medium - Yellow/Amber
    return "#F44336"; // Poor - Red
  };

  const menuButton = () => {
    console.log("clicked");
    setShowMenu(!showMenu);
  };

  return (
    <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
      <View style={{ width: "100%" }}>
        <View style={styles.header}>
          <Link href={"/"} onPress={menuButton}>
            <Image
              source={{
                uri: "https://cdn.prod.website-files.com/65381fa7067c778a5cb91973/653bb31378999636f0f1fb3d_LETSTOP%20LOGO.png",
              }}
              style={{ width: 200, height: 100 }}
              resizeMode="contain"
            />{" "}
          </Link>
          <TouchableOpacity onPress={menuButton} style={styles.menuButtonContainer}>
            <Entypo name="menu" size={24} color={colors.primaryWhite} />
          </TouchableOpacity>
        </View>
      </View>
      {showMenu && (
        <View style={styles.menuContainer}>
          <Link href={"/"} style={styles.submitButton}>
            Home
          </Link>
          <Link href={"/history"} style={styles.submitButton}>
            History
          </Link>
        </View>
      )}
      {/* <Text style={styles.title}>Driving Behavior Monitor</Text>
      <Text style={styles.subtitle}>Track your driving sustainability</Text> */}

      <ImageBackground
        source={{
          uri: "https://cdn.prod.website-files.com/65381fa7067c778a5cb91973/658456acfeca5d5213dd2bbb_Phone%20background-1.png",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
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
            <TouchableOpacity style={styles.submitButton} onPress={submitDrivingData} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Submit</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={resetForm} disabled={loading}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationContainer}>
            <Link href="/history" style={styles.link}>
              <Text style={styles.linkText}>View Driving History</Text>
            </Link>
          </View>
        </View>
      </ImageBackground>

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Driving Analysis</Text>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Status:</Text>
            <Text style={[styles.resultValue, { color: result.isFlagged ? "#F44336" : "#4CAF50" }]}>
              {result.isFlagged ? "Flagged" : "Safe"}
            </Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Sustainability Score</Text>
            <View
              style={[styles.scoreCircle, { backgroundColor: getScoreColor(parseFloat(result.sustainabilityScore)) }]}
            >
              <Text style={styles.scoreValue}>{Math.round(parseFloat(result.sustainabilityScore) * 100)}</Text>
            </View>
          </View>

          <View style={styles.metricsContainer}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Acceleration</Text>
              <Text
                style={[
                  styles.metricValue,
                  parseFloat(result.acceleration.toString()) > 3.0 ? styles.flaggedValue : {},
                ]}
              >
                {result.acceleration.toFixed(1)}
              </Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Braking</Text>
              <Text
                style={[styles.metricValue, parseFloat(result.braking.toString()) > 4.0 ? styles.flaggedValue : {}]}
              >
                {result.braking.toFixed(1)}
              </Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Turn</Text>
              <Text style={[styles.metricValue, parseFloat(result.turn.toString()) > 2.5 ? styles.flaggedValue : {}]}>
                {result.turn.toFixed(1)}
              </Text>
            </View>
          </View>

          <Text style={styles.timestamp}>Timestamp: {new Date(result.timestamp).toLocaleString()}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textSecondary,
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
  menuButtonContainer: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.callToAction,
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
  submitButton: {
    backgroundColor: "#FF132A",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    flex: 0.7,
    borderWidth: 0.4,
    borderColor: colors.primaryWhite,
  },
  resetButton: {
    backgroundColor: "transparent",
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    flex: 0.25,
    borderWidth: 1,
    borderColor: colors.primaryWhite,
  },
  buttonText: {
    color: colors.primaryWhite,
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButtonText: {
    color: "#666",
    fontSize: 16,
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
  resultContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 16,
    color: "#666",
  },
  resultValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scoreContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  scoreLabel: {
    fontSize: 16,
    color: "#FF132A",
    marginBottom: 8,
  },
  scoreCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValue: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  metricCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
    marginRight: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  flaggedValue: {
    color: "#F44336",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 16,
  },
});
