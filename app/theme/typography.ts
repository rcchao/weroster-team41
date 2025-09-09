// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

export const customFontsToLoad = {
  "Montserrat": require("../../assets/fonts/Montserrat-VariableFont_wght.ttf"),
  "Montserrat-Italic": require("../../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
  "Inter": require("../../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  "Inter-Italic": require("../../assets/fonts/Inter-Italic-VariableFont_opsz,wght.ttf"),
}

const fonts = {
  Montserrat: {
    // Cross-platform Google font.
    light: "Montserrat-Light",
    normal: "Montserrat-Regular",
    medium: "Montserrat-Medium",
    semiBold: "Montserrat-SemiBold",
    bold: "Montserrat-Bold",
  },
  Inter: {
    light: "Inter-Light",
    normal: "Inter-Regular",
    medium: "Inter-Medium",
    semiBold: "Inter-SemiBold",
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
  primary: fonts.Montserrat,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: fonts.Inter,
}
