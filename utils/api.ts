import { Alert } from "react-native";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL || "http://localhost:5000";

console.log("API_URL:", API_URL);

export interface DrivingData {
  driverId: string;
  acceleration: number;
  braking: number;
  turn: number;
}

export interface DrivingResponse extends DrivingData {
  isFlagged: boolean;
  timestamp: string;
  sustainabilityScore: string;
}

// export interface DrivingEvent {
//   _id: string;
//   driverId: string;
//   acceleration: number;
//   braking: number;
//   turn: number;
//   isFlagged: boolean;
//   sustainabilityScore: number;
//   timestamp: string;
// }

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

//   async getDrivingHistory(driverId: string): Promise<DrivingEvent[]> {
//     try {
//       const response = await fetch(`${API_URL}/driving-history/${driverId}`);

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       const errorMessage = error instanceof Error ? error.message : "Unknown error";
//       console.error(`Failed to fetch driving history: ${errorMessage}`);
//       throw error;
//     }
//   },
// };
