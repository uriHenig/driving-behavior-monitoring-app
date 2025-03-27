import { Alert } from "react-native";
import Constants from "expo-constants";
import { DrivingData, DrivingResponse } from "@/lib/types";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://localhost:5000";

// export interface DrivingData {
//   driverId: string;
//   acceleration: number;
//   braking: number;
//   turn: number;
// }

// export interface DrivingResponse extends DrivingData {
//   isFlagged: boolean;
//   timestamp: string;
//   sustainabilityScore: number;
// }

export const api = {
  async submitDrivingData(data: DrivingData): Promise<DrivingResponse> {
    try {
      // console.log("API Request Payload:", JSON.stringify(data, null, 2));

      const response = await fetch(`${API_URL}/monitor-behavior`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // console.log("Response Status:", response.status);

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
