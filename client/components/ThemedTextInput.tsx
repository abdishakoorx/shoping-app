import React from 'react';
import { TextInput, type TextInputProps, StyleSheet, View, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  variant?: 'default' | 'outline' | 'underline';
  size?: 'default' | 'small' | 'large';
  label?: string;
  error?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  variant = 'default',
  size = 'default',
  label,
  error,
  ...rest
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    'text'
  );
  const borderColor = useThemeColor(
    { light: Colors.light.icon, dark: Colors.dark.icon },
    'icon'
  );
  const errorColor = useThemeColor(
    { light: '#ff0000', dark: '#ff0000' },
    'text'
  );

  const inputStyles = [
    styles.input,
    variant === 'default' && styles.default,
    variant === 'outline' && styles.outline,
    variant === 'underline' && styles.underline,
    size === 'small' && styles.small,
    size === 'large' && styles.large,
    { backgroundColor, color: textColor, borderColor },
    style,
  ];

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: textColor }]}>{label}</Text>}
      <TextInput
        style={inputStyles}
        placeholderTextColor={Colors.light.icon}
        {...rest}
      />
      {error && <Text style={[styles.error, { color: errorColor }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,    
    marginHorizontal: 10,
  },
  input: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  default: {
    backgroundColor: Colors.light.background,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  underline: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  error: {
    fontSize: 12,
    marginTop: 4,
    color: '#ff0000',
  },
});