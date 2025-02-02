import { emojis } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

export default function EmojiPickerScreen() {
  const router = useRouter();
  const { setSelectedEmoji } = useListCreation();
  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmoji(emoji);
    router.back();
  };

  return (
    <FlatList
      data={emojis}
      numColumns={6}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{padding:16, paddingBottom: 100}}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleEmojiSelect(item)} style={{flex: 1, alignContent: "center", justifyContent:"center"}}>
          <Text style={{fontSize: 40}}>{item}</Text>
        </Pressable>
      )}
    />
  );
}
