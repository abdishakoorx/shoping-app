import { BodyScrollView } from "@/components/BodyScrollView";
import IconCircle from "@/components/IconCircle";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Href, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

const isValidUUID = (id: string | null) => {
  if (!id) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};
export default function NewListScreen() {
  const router = useRouter();
  const [listId, setListId] = useState("");
  const isValidListId = useMemo(() => isValidUUID(listId), [listId]);
  const handleJoinList = () => {};
  const joinShoppingListCallback = (listId: string) => {};
  const handleDismissTo = (screen: Href) => {
    if (router.canDismiss()) {
      router.dismiss();
      setTimeout(() => {
        router.push(screen);
      }, 100);
    }
  };

  return (
    <BodyScrollView style={{ padding: 16 }}>
      <View style={{ alignItems: "center", marginTop: 32, gap: 16 }}>
        <IconCircle
          emoji="📃"
          size={80}
          style={{ alignSelf: "center", marginBottom: 8 }}
        />
        <ThemedText type="title">Let's do it!</ThemedText>
        <ThemedText
          type="defaultSemiBold"
          style={{ textAlign: "center", color: "gray", paddingHorizontal: 8 }}
        >
          Create shopping lists and update them in real time for everyone.
        </ThemedText>
      </View>

      <View style={{ gap: 16, marginTop: 32 }}>
        <ThemedButton
          size="large"
          onPress={() => handleDismissTo("/list/new/create")}
        >
          Create new list
        </ThemedButton>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View style={styles.separator} />
          <ThemedText type="small" style={{ color: "gray" }}>
            Or join existing
          </ThemedText>
          <View style={styles.separator} />
        </View>
      </View>

      <View style={{ gap: 16, marginTop: 32 }}>
        <ThemedTextInput
          style={{ marginBottom: 0 }}
          placeholder="Enter a list code"
          label="Enter a list code"
          value={listId}
          onChangeText={setListId}
          onSubmitEditing={(e) => {
            joinShoppingListCallback(e.nativeEvent.text);
          }}
        />
        <ThemedButton onPress={handleJoinList} disabled={!isValidListId}>
          Join List
        </ThemedButton>
        <ThemedText
          type="link"
          style={{ fontWeight: "700", alignSelf: "center" }}
          onPress={() => handleDismissTo("/list/new/scan")}
        >
          Scan QR Code
        </ThemedText>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    flex: 1,
    backgroundColor: "gray",
  },
});
