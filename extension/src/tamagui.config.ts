import { createTamagui } from 'tamagui'

export default createTamagui({
  defaultTheme: 'light',
  themes: {
    light: {},
    dark: {},
  },
  // Define basic spacing tokens to avoid runtime errors when components
  // reference values like `$4` for padding or gap.
  tokens: {
    space: {
      0: 0,
      1: 4,
      2: 8,
      3: 12,
      4: 16,
    },
  },
})
