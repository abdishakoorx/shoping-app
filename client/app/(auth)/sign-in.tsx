import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function SingInScreen() {
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);

  const onSigninPress = useCallback(async () => {
    if (!isLoaded) return;
    setIsSigningIn(true);

    try {
      const signinAttempt = signIn.create({
        identifier: emailAddress,
        password,
      });

      if ((await signinAttempt).status === "complete") {
        await setActive({ session: (await signinAttempt).createdSessionId });
        router.replace("/(home)");
      } else {
        console.error(JSON.stringify(signinAttempt, null, 2));
      }
    } catch (e) {
      if (isClerkAPIResponseError(e)) {
        setErrors(e.errors);
      }
      console.error(JSON.stringify(e, null, 2));
    } finally {
      setIsSigningIn(false);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <BodyScrollView contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}>
      <View>
        <ThemedTextInput
          variant="default"
          size="default"
          label="Email"
          placeholder="Enter your email"
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <ThemedTextInput
          variant="default"
          size="default"
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <ThemedButton
        variant="default"
        onPress={onSigninPress}
        loading={isSigningIn}
        disabled={!emailAddress || !password || isSigningIn}
      >
        Sign in
      </ThemedButton>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          marginTop: 16,
          justifyContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <ThemedText>Don't have an account?</ThemedText>
          <ThemedText
            type="link"
            onPress={() => router.push("/(auth)/sign-up")}
          >
            Sign up
          </ThemedText>
        </View>
        <View style={{ alignItems: "center" }}>
          <ThemedText>Forgot Password?</ThemedText>
          <ThemedText
            type="link"
            onPress={() => router.push("/(auth)/reset-password")}
          >
            Reset Password
          </ThemedText>
        </View>
      </View>
    </BodyScrollView>
  );
}
