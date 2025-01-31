import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedText } from "@/components/ThemedText";

export default function NewListScreen() {
    return (
        <BodyScrollView>
            <ThemedText type="subtitle">Let's do it!</ThemedText>
            <ThemedText type="defaultSemiBold">Create shopping lists and update them in real time for everyone.</ThemedText>
        </BodyScrollView>
    )
}