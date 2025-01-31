import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useClerk } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";
export default function HomeScreen() {
  const { signOut } = useClerk();
  const router = useRouter();

  const renderHeaderLeft = () => {
    return (
      <Pressable onPress={() => router.push("/profile")}>
        <IconSymbol name="gear" color={'appleblue'} />
      </Pressable>
    );
  };
  const renderHeaderRight = () => {
    return (
      <Pressable onPress={() => router.push("/(home)/list/new")}>
        <IconSymbol name="plus" color={'appleblue'} />
      </Pressable>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
        }}
      />
      <BodyScrollView style={{ padding: 16 }}>
        <ThemedText type="title">HomeScreen</ThemedText>
        <ThemedButton variant="destructive" onPress={() => signOut()}>
          Log out
        </ThemedButton>
      </BodyScrollView>
    </>
  );
}
