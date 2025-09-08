// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

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
  inter: {
    thin: "Inter-Thin",
    normal: "Inter",
    medium: "Inter-Medium",
    bold: "Inter-Bold",
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
}
