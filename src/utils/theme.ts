export const COLORS = {
  // Base colors
  background: '#0D0D1A',
  surface: '#12122A',
  surfaceSecondary: '#1A1A2E',
  border: '#2A2A4A',
  borderSecondary: '#2E2E50',

  // Input specific
  inputBackground: '#1A1A2E',
  inputBorder: '#2E2E50',

  // Text colors
  text: '#F0F0FF',
  textPrimary: '#F0F0FF',
  textSecondary: '#8A8AB0',
  textPlaceholder: '#8A8A9A',
  label: '#F0F0FF',

  // Accent colors
  primary: '#7C6AF7',
  secondary: '#4ECDC4',
  error: '#FF6B8A',
  borderError: '#FF6B8A',

  // Status colors
  success: '#4ECDC4',
  warning: '#FFA500',
  info: '#7C6AF7',
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 32,
} as const;

export const FONT_SIZE = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 28,
} as const;

export const FONT_WEIGHT = {
  normal: 'normal' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: 'bold' as const,
} as const;

export const SHADOWS = {
  small: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  medium: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;