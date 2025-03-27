export interface DrivingData {
  driverId: string;
  acceleration: number;
  braking: number;
  turn: number;
}

export interface DrivingResponse extends DrivingData {
  isFlagged: boolean;
  timestamp: string;
  sustainabilityScore: number;
}
