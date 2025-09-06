import { defaultConfig } from "@tamagui/config/v4"
import { createTokens, createTamagui } from "tamagui"

const tokens = createTokens({
  ...defaultConfig.tokens,
  color: {
    dark: "#1E1F1F",
    slate: "#E0E1E1",

    yellow100: "#FAF1E0",
    yellow200: "#F6E3C0",
    yellow300: "#F1D5A1",
    yellow400: "#EDC781",
    yellow500: "#E8B962",
    yellow600: "#BA944E",
    yellow700: "#8B6F3B",
    yellow800: "#5D4A27",
    yellow900: "#2E2514",

    green100: "#E9F8E9",
    green200: "#D3F2D3",
    green300: "#BEEBBE",
    green400: "#A8E5A8",
    green500: "#92DE92",
    green600: "#75B275",
    green700: "#588558",
    green800: "#3A593A",
    green900: "#1D2C1D",

    red100: "#FBE9E9",
    red200: "#F7D3D3",
    red300: "#F3BDBD",
    red400: "#EFA7A7",
    red500: "#EB9191",
    red600: "#BC7474",
    red700: "#8D5757",
    red800: "#5E3A3A",
    red900: "#2F1D1D",

    accent100: "#DEF1FA",
    accent200: "#BDE2F4",
    accent300: "#9DD4EF",
    accent400: "#7CC5E9",
    accent500: "#5BB7E4",
    accent600: "#4992B6",
    accent700: "#376E89",
    accent800: "#24495B",
    accent900: "#11252E",

    secondary100: "#D9E9F5",
    secondary200: "#B3D3E8",
    secondary300: "#8CBCE1",
    secondary400: "#66A6D7",
    secondary500: "#4090CD",
    secondary600: "#3373A4",
    secondary700: "#26567B",
    secondary800: "#1A3A52",
    secondary900: "#0D1D29",

    primary100: "#D4DDE5",
    primary200: "#ABBCCA",
    primary300: "#7D9AB0",
    primary400: "#517895",
    primary500: "#26567B",
    primary600: "#1E4562",
    primary700: "#17344A",
    primary800: "#0F2231",
    primary900: "#081119",

    mono100: "#E0E1E1",
    mono200: "#C8C9C9",
    mono300: "#B0B1B1",
    mono400: "#979898",
    mono500: "#7F8080",
    mono600: "#676868",
    mono700: "#4F5050",
    mono800: "#363737",
    mono900: "#1E1F1F",

    white100: "#FFFFFF",
    white200: "#FBFBFB",
    white300: "#F7F8F8",
    white400: "#F3F4F4",
    white500: "#F0F0F0",
    white600: "#ECECEC",
    white700: "#E8E9E9",
    white800: "#E4E5E5",
    white900: "#E0E1E1",
  },
  radius: {
    ...defaultConfig.tokens.radius,
    1: 4,
    2: 6,
    3: 8,
    4: 12,
    5: 16,
    6: 20,
    7: 24,
    8: 32,
    9: 40,
    10: 48,
    full: 9999,
  },
})

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes: {
    ...defaultConfig.themes,
    // Add in custom themes here
  },
  tokens,
})

type OurConfig = typeof tamaguiConfig

declare module "tamagui" {
  interface TamaguiCustomConfig extends OurConfig {}
}

export default tamaguiConfig
