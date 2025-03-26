import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DrivingMetrics from "./DrivingMetrics";

interface DrivingResultDisplayProps {
  result: {
    isFlagged: boolean;
    sustainabilityScore: string;
    acceleration: number;
    braking: number;
    turn: number;
    timestamp: string;
  };
}

const DrivingResultDisplay: React.FC<DrivingResultDisplayProps> = ({ result }) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "#4CAF50"; // Good - Green
    if (score >= 0.5) return "#FFC107"; // Medium - Yellow/Amber
    return "#F44336"; // Poor - Red
  };

  return (
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
        <View style={[styles.scoreCircle, { backgroundColor: getScoreColor(parseFloat(result.sustainabilityScore)) }]}>
          <Text style={styles.scoreValue}>{Math.round(parseFloat(result.sustainabilityScore) * 100)}</Text>
        </View>
      </View>

      <DrivingMetrics result={result} />

      <Text style={styles.timestamp}>Timestamp: {new Date(result.timestamp).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  timestamp: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 16,
  },
});

export default DrivingResultDisplay;
