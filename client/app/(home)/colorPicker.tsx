import { backgroundColors } from "@/constants/Colors";
import { useListCreation } from "@/context/ListCreationContext";
import { useRouter } from "expo-router";
import { FlatList, Pressable, View } from "react-native";

export default function ColorPickerScreen() {
  const router = useRouter();
  const { setSelectedColor } = useListCreation();
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    router.back();
  };

  return (
    <FlatList
      data={backgroundColors}
      numColumns={6}
      keyExtractor={(item) => item}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{padding:16, paddingBottom: 100, gap: 16}}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleColorSelect(item)} style={{flex: 1, alignContent: "center", justifyContent:"center"}}>
          <View style={{height: 40, width: 40, borderRadius: 100, backgroundColor: item}}/>
        </Pressable>
      )}
    />
  );
}
