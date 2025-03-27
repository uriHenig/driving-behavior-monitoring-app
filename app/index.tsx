// import React, { useState } from "react";
// import { StyleSheet, ScrollView, Text, ImageBackground } from "react-native";
// import Header from "@/components/Header";
// import DrivingResultDisplay from "@/components/DrivingResultDisplay";
// import DrivingDataForm from "@/components/DrivingDataForm";
// import colors from "@/utils/theme";
// import { DrivingResponse } from "@/utils/api";

// export default function Index() {
//   const [result, setResult] = useState<DrivingResponse | null>(null);

//   const handleSubmitSuccess = (responseData: DrivingResponse) => {
//     setResult(responseData);
//   };

//   const handleResetForm = () => {
//     setResult(null);
//   };

//   return (
//     <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
//       <Header />

//       <ImageBackground
//         source={{
//           uri: "https://cdn.prod.website-files.com/65381fa7067c778a5cb91973/658456acfeca5d5213dd2bbb_Phone%20background-1.png",
//         }}
//         style={styles.backgroundImage}
//         resizeMode="cover"
//       >
//         <Text style={styles.title}>Braking bad driving habits Together.</Text>

//         <DrivingDataForm onSubmitSuccess={handleSubmitSuccess} onResetForm={handleResetForm} />
//       </ImageBackground>
//       {result && <DrivingResultDisplay result={result} />}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   backgroundImage: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "400",
//     marginTop: 10,
//     color: colors.title,
//     textAlign: "center",
//   },
// });

import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, ImageBackground } from "react-native";
import InputField from "@/components/InputField";
import colors from "../lib/theme";
import Header from "@/components/Header";
import DrivingResultDisplay from "@/components/DrivingResultDisplay";
import Button from "@/components/Button";
import { DrivingResponse, DrivingData } from "@/lib/types";
import { api } from "@/utils/api";
import DrivingDataForm from "@/components/DrivingDataForm";

// Todo:
// 1. fix history GET command in server

export default function Index() {
  const [result, setResult] = useState<DrivingResponse | null>(null);
  // const [driverId, setDriverId] = useState("driver123");
  // const [acceleration, setAcceleration] = useState("");
  // const [braking, setBraking] = useState("");
  // const [turn, setTurn] = useState("");

  // const [result, setResult] = useState<DrivingResponse | null>(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  // const submitDrivingData = async () => {
  //   setLoading(true);
  //   setError("");

  //   if (!acceleration || !braking || !turn) {
  //     setError("Please fill in all fields");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const data: DrivingData = {
  //       driverId,
  //       acceleration: parseFloat(acceleration), //check if preferable to
  //       braking: parseFloat(braking), //just set usestate as number
  //       turn: parseFloat(turn),
  //     };

  //     if (isNaN(data.acceleration) || isNaN(data.braking) || isNaN(data.turn)) {
  //       setError("All values must be valid numbers");
  //       setLoading(false);
  //       return;
  //     }

  //     const responseData = await api.submitDrivingData(data);
  //     setResult(responseData);
  //   } catch (err) {
  //     setError(`Failed to submit data: ${err instanceof Error ? err.message : "Unknown error"}`);
  //     Alert.alert("Error", "Failed to submit driving data. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const resetForm = () => {
  //   setAcceleration("");
  //   setBraking("");
  //   setTurn("");
  //   setResult(null);
  //   setError("");
  // };

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
        <Text style={styles.title}>Braking bad driving habits Together.</Text>

        {/* <View style={styles.inputContainer}>
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
        </View> */}
        <DrivingDataForm onSubmitResult={setResult} />
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
