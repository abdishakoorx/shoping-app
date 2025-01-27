import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useClerk } from "@clerk/clerk-expo";
export default function HomeScreen() {
  const { signOut } = useClerk();
  return (
    <BodyScrollView style={{ padding: 16 }}>
      <ThemedText type="title">HomeScreen</ThemedText>
      <ThemedButton variant="destructive" onPress={() => signOut()}>
        Log out
      </ThemedButton>
    </BodyScrollView>
  );
}
