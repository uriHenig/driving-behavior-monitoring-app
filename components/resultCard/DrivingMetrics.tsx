import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MetricCardProps {
  label: string;
  value: number;
  threshold: number;
  unit?: string;
}

interface DrivingMetricsProps {
  result: {
    acceleration: number;
    braking: number;
    turn: number;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, threshold, unit = "" }) => {
  const exceededThreshold = value > threshold;

  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, exceededThreshold ? styles.flaggedValue : {}]}>
        {value.toFixed(1)}
        {unit}
      </Text>
    </View>
  );
};

const DrivingMetrics: React.FC<DrivingMetricsProps> = ({ result }) => {
  const metrics = [
    { label: "Acceleration", value: result.acceleration, threshold: 3.0 },
    { label: "Braking", value: result.braking, threshold: 4.0 },
    { label: "Turn", value: result.turn, threshold: 2.5 },
  ];

  return (
    <View style={styles.metricsContainer}>
      {metrics.map((metric, index) => (
        <MetricCard key={index} label={metric.label} value={metric.value} threshold={metric.threshold} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default DrivingMetrics;
