import React, { memo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from '../utils/theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  /** background color of the button; defaults to primary violet */
  backgroundColor?: string;
  /** text color; defaults to white */
  textColor?: string;
  /** shadow/glow color */
  shadowColor?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = memo(({
  title,
  onPress,
  disabled = false,
  loading = false,
  backgroundColor = COLORS.primary,
  textColor = COLORS.text,
  shadowColor,
}) => {
  const containerStyles = [
    styles.button,
    { backgroundColor },
    disabled && styles.disabled,
    shadowColor && { shadowColor },
  ];

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading }}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={textColor} accessibilityLabel="Loading" />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrimaryButton;