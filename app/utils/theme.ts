export const colors = {
  red: {
    main: '#d04a53',
    light: '#d76269',
    dark: '#bb424a',
  },
  green: {
    light: '#bce3de',
    main: '#b7e1dd',
    dark: '#a5cbc7',
  },
  yellow: {
    main: '#faedcb',
    light: '#fbf2d7',
    dark: '#e1d5b7',
  },
  text: {
    primary: '#333333',
    secondary: '#666666',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
  },
  status: {
    success: '#b7e1dd',
    error: '#d04a53',
    warning: '#faedcb',
    info: '#bce3de',
  },
  gradients: {
    primary: `linear-gradient(to right, #d04a53, #b7e1dd)`,
    secondary: `linear-gradient(to bottom, #bce3de, #faedcb)`,
  },
} as const;

// Type definitions for better TypeScript support
export type ColorKeys = keyof typeof colors;
export type SubColorKeys<T extends ColorKeys> = keyof typeof colors[T];

// Helper function to get color with type safety
export const getColor = (category: ColorKeys, shade: SubColorKeys<typeof category>) => {
  return colors[category][shade];
};