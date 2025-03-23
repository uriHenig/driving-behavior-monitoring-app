// app/_layout.tsx - Root layout for the app
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Driving Behavior Monitor",
          }}
        />
        <Stack.Screen
          name="history"
          options={{
            headerShown: false,
            title: "Driving History",
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
