import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Button, View } from "react-native";

export default function SingInScreen() {
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  return (
    <View>
      <ThemedText type="title">Wassup</ThemedText>
      <ThemedText>
        <Link href={"/(auth)/sign-up"}>Sign up</Link>
      </ThemedText>
      <ThemedTextInput
        variant="default"
        size="small"
        label="Username"
        placeholder="Enter your username"
      />
      <ThemedButton variant="default" size="default">Welcome</ThemedButton>

      <ThemedText type="link"><Link href={"/(auth)/reset-password"}>Forgot password</Link></ThemedText>
    </View>
  );
}
