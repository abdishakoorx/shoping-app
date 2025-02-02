import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { backgroundColors, emojis } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function CreateNewListScreen() {
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const { selectedColor, selectedEmoji, setSelectedColor, setSelectedEmoji } =
    useListCreation();

  const handleCreateList = () => {};

  useEffect(() => {
    setSelectedEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    setSelectedColor(
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
    );

    return () => {
      setSelectedColor("")
      setSelectedEmoji("")
    }
  }, []);

  return (
    <>
      <Stack.Screen
        options={{ headerTitle: "New List", headerLargeTitle: false }}
      />
      <BodyScrollView style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 100,
          }}
        >
          <ThemedTextInput
            placeholder="Grocery Essentials"
            variant="ghost"
            size="large"
            returnKeyType="done"
            onSubmitEditing={handleCreateList}
            value={listName}
            onChangeText={setListName}
            autoFocus
            style={{
              fontSize: 28,
              fontWeight: "600",
              paddingHorizontal: 0,
              paddingVertical: 0,
              backgroundColor: "transparent",
              flexGrow: 1,
              flexShrink: 1,
              maxWidth: "auto",
              marginBottom: 0,
            }}
          />

          <Link
            href={{ pathname: "/(home)/emojiPicker" }}
            style={{
              borderColor: selectedColor,
              padding: 4,
              borderWidth: 4,
              borderRadius: 32,
              marginBottom: 12,
            }}
          >
            <View style={{ padding: 2 }}>
              <Text>{selectedEmoji}</Text>
            </View>
          </Link>
          <Link
            href={{ pathname: "/(home)/colorPicker" }}
            style={{
              borderColor: selectedColor,
              padding: 4,
              borderWidth: 4,
              borderRadius: 100,
              marginBottom: 12,
            }}
          >
            <View>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  backgroundColor: selectedColor,
                }}
              />
            </View>
          </Link>
        </View>
        <ThemedTextInput
          label="Optional"
          placeholder="Description"
          value={listDescription}
          onChangeText={setListDescription}
          onSubmitEditing={handleCreateList}
          returnKeyType="done"
          variant="ghost"
          style={{ backgroundColor: "transparent" }}
        />
        <ThemedButton
          variant="outline"
          disabled={!listName}
          onPress={handleCreateList}
        >
          Create list
        </ThemedButton>
      </BodyScrollView>
    </>
  );
}
