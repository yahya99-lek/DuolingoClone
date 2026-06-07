// Design tokens for the Lingua app.
// Use these in StyleSheet.create() or runtime inline styles.
// For className-based styling, use the NativeWind/Tailwind utilities from global.css.

export const colors = {
  // Primary
  primary: "#6C4EF5",     // Lingua Purple
  primaryDeep: "#5B3BF6", // Lingua Deep Purple
  blue: "#4D88FF",        // Lingua Blue
  green: "#21C16B",       // Lingua Green

  // Semantic
  success: "#21C16B",
  warning: "#FFCB00",
  streak: "#FF8A00",
  error: "#FF4D4F",
  info: "#4D88FF",

  // Neutrals
  textPrimary: "#001328",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
  surface: "#F6F7FB",
  background: "#FFFFFF",
} as const;

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

// Font sizes in dp (density-independent pixels)
export const fontSize = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  bodyLarge: 16,
  bodyMedium: 14,
  bodySmall: 13,
  caption: 11,
} as const;

// Absolute line heights in dp (font-size × multiplier)
export const lineHeight = {
  h1: 38,        // 32 × 1.2
  h2: 31,        // 24 × 1.3
  h3: 26,        // 20 × 1.3
  h4: 22,        // 16 × 1.4
  bodyLarge: 26, // 16 × 1.6
  bodyMedium: 22, // 14 × 1.6
  bodySmall: 21, // 13 × 1.6
  caption: 15,   // 11 × 1.4
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 48,
} as const;
