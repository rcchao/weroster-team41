// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  Montserrat_300Light as montserratLight,
  Montserrat_400Regular as montserratRegular,
  Montserrat_500Medium as montserratMedium,
  Montserrat_600SemiBold as montserratSemiBold,
  Montserrat_700Bold as montserratBold,
} from "@expo-google-fonts/montserrat"

export const customFontsToLoad = {
  montserratLight,
  montserratRegular,
  montserratMedium,
  montserratSemiBold,
  montserratBold,
}

const fonts = {
  montserrat: {
    // Cross-platform Google font.
    light: "montserratLight",
    normal: "montserratRegular",
    medium: "montserratMedium",
    semiBold: "montserratSemiBold",
    bold: "montserratBold",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  inter: {
    thin: "Inter-Thin",
    normal: "Inter",
    medium: "Inter-Medium",
    bold: "Inter-Bold",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.montserrat,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: fonts.inter,
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
