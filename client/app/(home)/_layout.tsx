import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "@clerk/clerk-expo";
import { Redirect, Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function HomeRoutesLayout() {
  const router = useRouter();

  const user = useUser();

  if (!user) {
    return <Redirect href={"/(auth)"} />;
  }
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS !== "ios"
          ? {}
          : {
              headerLargeTitle: true,
              headerTransparent: true,
              headerBlurEffect: "systemChromeMaterial",
              headerLargeTitleShadowVisible: true,
              headerShadowVisible: true,
              headerLargeStyle: { backgroundColor: "transparent" },
            }),
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "Shopping Lists" }} />
      <Stack.Screen
        name="list/new/index"
        options={{
          presentation: "formSheet",
          sheetGrabberVisible: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.75, 1],
          sheetGrabberVisible: true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="list/new/scan"
        options={{
          presentation: "fullScreenModal",
          headerLargeTitle: false,
          headerTitle: "Scan QR Code",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <ThemedText style={{ color: "#007AFF" }} type="link">
                Cancel
              </ThemedText>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
