import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type TouchableOpacityProps,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export type ThemedButtonProps = TouchableOpacityProps & {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  size?: "default" | "small" | "large" | "icon";
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
};

export function ThemedButton({
  style,
  variant = "default",
  size = "large", // Default size set to large
  children,
  loading = false,
  disabled = false,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    {},
    variant === "default"
      ? "backgroundInverse" // White in dark mode, black in light mode
      : variant === "secondary"
      ? "secondary"
      : variant === "destructive"
      ? "destructiveBg"
      : "background"
  );

  const textColor = useThemeColor(
    {},
    variant === "default"
      ? "background" // Dark text in light mode, white text in dark mode
      : variant === "destructive"
      ? "destructiveText"
      : "text"
  );

  const borderColor = useThemeColor({}, "border");
  const disabledBackgroundColor = useThemeColor({}, "disabledBg");
  const disabledTextColor = useThemeColor({}, "disabledText");

  const buttonStyles = [
    styles.button,
    variant === "outline" && { borderColor, borderWidth: 1 },
    (variant === "ghost" || variant === "link") && {
      backgroundColor: "transparent",
    },
    size === "small" && styles.small,
    size === "large" && styles.large,
    size === "icon" && styles.icon,
    { backgroundColor: disabled ? disabledBackgroundColor : backgroundColor },
    style,
  ];

  const textStyles = [
    styles.text,
    size === "small" && styles.smallText,
    size === "large" && styles.largeText,
    variant === "link" && styles.linkText,
    { color: disabled ? disabledTextColor : textColor },
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : typeof children === "string" ? (
        <Text style={textStyles}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 16, // Default large padding
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  icon: {
    padding: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  linkText: {
    textDecorationLine: "underline",
  },
});
