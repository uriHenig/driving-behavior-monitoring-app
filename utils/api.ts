import { Alert } from "react-native";
import Constants from "expo-constants";
import { DrivingData, DrivingResponse } from "@/lib/types";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://localhost:5000";

export const api = {
  async submitDrivingData(data: DrivingData): Promise<DrivingResponse> {
    try {

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
      return await response.json();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      Alert.alert("Error", `Failed to submit driving data: ${errorMessage}`);
      throw error;
    }
  },
};
