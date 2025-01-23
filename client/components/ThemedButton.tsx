import React from 'react';
import { TouchableOpacity, Text, StyleSheet, type TouchableOpacityProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedButtonProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'small' | 'large' | 'icon';
  children: React.ReactNode;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  variant = 'default',
  size = 'default',
  children,
  ...rest
}: ThemedButtonProps) {
  // Background color remains consistent for the default variant
  const backgroundColor =
    variant === 'default'
      ? Colors.light.tint // Always use the light mode tint color for brand identity
      : useThemeColor(
          { light: lightColor, dark: darkColor },
          variant === 'secondary' ? 'secondary' : variant === 'destructive' ? 'destructive' : 'background'
        );

  // Text color adapts to the theme
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    variant === 'default' || variant === 'secondary' || variant === 'destructive' ? 'text' : 'tint'
  );

  const borderColor = useThemeColor(
    { light: Colors.light.tint, dark: Colors.dark.tint },
    'tint'
  );

  const buttonStyles = [
    styles.button,
    variant === 'default' && styles.default,
    variant === 'secondary' && styles.secondary,
    variant === 'destructive' && styles.destructive,
    variant === 'outline' && styles.outline,
    variant === 'ghost' && styles.ghost,
    variant === 'link' && styles.link,
    size === 'small' && styles.small,
    size === 'large' && styles.large,
    size === 'icon' && styles.icon,
    { backgroundColor },
    variant === 'outline' && { borderColor },
    style,
  ];

  const textStyles = [
    styles.text,
    variant === 'default' && styles.defaultText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'destructive' && styles.destructiveText,
    variant === 'outline' && styles.outlineText,
    variant === 'ghost' && styles.ghostText,
    variant === 'link' && styles.linkText,
    { color: textColor },
  ];

  return (
    <TouchableOpacity style={buttonStyles} {...rest}>
      {typeof children === 'string' ? <Text style={textStyles}>{children}</Text> : children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  default: {
    backgroundColor: Colors.light.tint, // Always the same for brand identity
  },
  secondary: {
    backgroundColor: Colors.light.secondary,
  },
  destructive: {
    backgroundColor: Colors.light.destructive,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
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
    fontWeight: '600',
  },
  defaultText: {
    color: Colors.light.text, // Text color adapts to the theme
  },
  secondaryText: {
    color: Colors.light.text,
  },
  destructiveText: {
    color: '#fff',
  },
  outlineText: {
    color: Colors.light.tint,
  },
  ghostText: {
    color: Colors.light.tint,
  },
  linkText: {
    color: Colors.light.tint,
    textDecorationLine: 'underline',
  },
});