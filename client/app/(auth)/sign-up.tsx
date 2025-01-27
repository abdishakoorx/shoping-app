import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function SignupScreen() {
  const { isLoaded, setActive, signUp } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [code, setCode] = useState<string>("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const onSignupPress = async () => {
    if (!isLoaded || !signUp) return;
    setIsLoading(true);
    setErrors([]);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setPendingVerification(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded || !signUp) return;
    setErrors([]);
    setIsLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if(signUpAttempt.status === "complete"){
        await setActive({session: signUpAttempt.createdSessionId})
        router.replace('/')
      }else{
        console.log(signUpAttempt)
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <BodyScrollView
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      >
        <ThemedTextInput
          value={code}
          label={`Enter verification code sent to ${emailAddress}`}
          placeholder="Enter code"
          onChangeText={(code) => setCode(code)}
        />
        <ThemedButton
          onPress={onVerifyPress}
          loading={isLoading}
          disabled={!code || isLoading}
        >
          Verify
        </ThemedButton>
        {errors.map((error) => (
          <ThemedText key={error.longMessage} style={{ color: "red" }}>
            {error.longMessage}
          </ThemedText>
        ))}
      </BodyScrollView>
    );
  }

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
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <ThemedButton
        variant="default"
        onPress={onSignupPress}
        loading={isLoading}
        disabled={!emailAddress || !password || isLoading}
      >
        Welcome
      </ThemedButton>

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          marginTop: 16,
          justifyContent: "center",
        }}
      >
        <ThemedText>Already have an account?</ThemedText>
        <ThemedText type="link" onPress={() => router.push("/(auth)/sign-in")}>
          Sign in
        </ThemedText>
      </View>
      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}
    </BodyScrollView>
  );
}
