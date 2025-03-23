// app/history.tsx - Screen for viewing driving history
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const API_URL = "http://192.168.43.106:5000";

// Types
interface DrivingEvent {
  _id: string;
  driverId: string;
  acceleration: number;
  braking: number;
  turn: number;
  isFlagged: boolean;
  sustainabilityScore: number;
  timestamp: string;
}

export default function History() {
  const [drivingHistory, setDrivingHistory] = useState<DrivingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchDrivingHistory();
  }, []);

  const fetchDrivingHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/driving-history/driver123`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDrivingHistory(data);
    } catch (err) {
      setError(`Failed to fetch history: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return "#4CAF50";
    if (score >= 0.5) return "#FFC107";
    return "#F44336";
  };

  const renderItem = ({ item }: { item: DrivingEvent }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyDate}>{new Date(item.timestamp).toLocaleDateString()}</Text>
        <Text style={styles.historyTime}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
      </View>

      <View style={styles.historyContent}>
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Acceleration</Text>
            <Text style={[styles.metricValue, item.acceleration > 3.0 ? styles.flaggedValue : {}]}>
              {item.acceleration.toFixed(1)}
            </Text>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Braking</Text>
            <Text style={[styles.metricValue, item.braking > 4.0 ? styles.flaggedValue : {}]}>
              {item.braking.toFixed(1)}
            </Text>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Turn</Text>
            <Text style={[styles.metricValue, item.turn > 2.5 ? styles.flaggedValue : {}]}>{item.turn.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Sustainability Score</Text>
          <View style={[styles.scoreCircle, { backgroundColor: getScoreColor(item.sustainabilityScore) }]}>
            <Text style={styles.scoreValue}>{Math.round(item.sustainabilityScore * 100)}</Text>
          </View>
        </View>

        <View style={styles.statusRow}>
          <Text style={[styles.statusBadge, { backgroundColor: item.isFlagged ? "#FFEBEE" : "#E8F5E9" }]}>
            <Text style={[styles.statusText, { color: item.isFlagged ? "#F44336" : "#4CAF50" }]}>
              {item.isFlagged ? "Flagged" : "Safe"}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Driving History</Text>
        <View style={styles.placeholder} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading history...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchDrivingHistory}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : drivingHistory.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No driving history found</Text>
        </View>
      ) : (
        <FlatList
          data={drivingHistory}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2196F3",
    padding: 16,
    paddingTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#2196F3",
    borderRadius: 4,
    padding: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f5f5f5",
  },
  historyDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  historyTime: {
    fontSize: 14,
    color: "#666",
  },
  historyContent: {
    padding: 12,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  flaggedValue: {
    color: "#F44336",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  scoreLabel: {
    fontSize: 14,
    color: "#666",
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
