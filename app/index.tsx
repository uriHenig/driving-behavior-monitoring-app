import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, ImageBackground } from "react-native";
import colors from "../lib/theme";
import Header from "@/components/Header";
import DrivingResultDisplay from "@/components/resultCard/DrivingResultDisplay";
import { DrivingResponse } from "@/lib/types";
import DrivingDataForm from "@/components/inputForm/DrivingDataForm";

export default function Index() {
  const [result, setResult] = useState<DrivingResponse | null>(null);

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
  backgroundImage: {
    flex: 1,
  },
});
