import { defaultConfig } from "@tamagui/config/v4"
import { createTamagui } from "tamagui"

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes: {
    ...defaultConfig.themes,
    // Add in custom themes here
  },
  tokens: {
    ...defaultConfig.tokens,
    // Add in custom typography tokens here
  },
})

type OurConfig = typeof tamaguiConfig

declare module "tamagui" {
  interface TamaguiCustomConfig extends OurConfig {}
}

export default tamaguiConfig
