import { BodyScrollView } from "@/components/BodyScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

export default function ResetPasswordScreen() {
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ClerkAPIError[]>([]);
  const [code, setCode] = useState<string>("");
  const [pendingVerification, setPendingVerification] = useState(false);

  const onResetPasswordPress = useCallback(async () => {
    if (!isLoaded) return;
    setErrors([]);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });

      setPendingVerification(true);
    } catch (e) {
      if (isClerkAPIResponseError(e)) setErrors(e.errors);
      console.error(JSON.stringify(e, null, 2));
    }
  }, [isLoaded, emailAddress, signIn]);

  const onVerifyPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signinAttempt = signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if ((await signinAttempt).status === "complete") {
        await setActive({ session: (await signinAttempt).createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(signinAttempt, null, 2));
      }
    } catch (e) {
      if (isClerkAPIResponseError(e)) setErrors(e.errors);
      console.error(JSON.stringify(e, null, 2));
    }
  }, [isLoaded, setActive, code, password, router, signIn]);

  if (pendingVerification) {
    return (
      <BodyScrollView
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
      >
        <View>
          <ThemedTextInput
            value={code}
            label={`Enter verification code sent to ${emailAddress}`}
            placeholder="Enter code"
            onChangeText={(code) => setCode(code)}
          />
          <ThemedTextInput
            variant="default"
            size="default"
            label="Enter your new password"
            secureTextEntry
            placeholder="Enter your new password"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <ThemedButton onPress={onVerifyPress} disabled={!code || !password}>
          Reset Password
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
      </View>
      <ThemedButton
        variant="default"
        onPress={onResetPasswordPress}
        disabled={!emailAddress}
      >
        Continue
      </ThemedButton>

      {errors.map((error) => (
        <ThemedText key={error.longMessage} style={{ color: "red" }}>
          {error.longMessage}
        </ThemedText>
      ))}
    </BodyScrollView>
  );
}
