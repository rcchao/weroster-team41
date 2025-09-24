// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

export const customFontsToLoad = {
  "Montserrat-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  "Montserrat-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
  "Inter-Regular": require("../../assets/fonts/Inter-Regular.ttf"),
  "Inter-Medium": require("../../assets/fonts/Inter-Medium.ttf"),
  "Inter-Bold": require("../../assets/fonts/Inter-Bold.ttf"),
}

const fonts = {
  Montserrat: {
    regular: "Montserrat-Regular",
    bold: "Montserrat-Bold",
  },
  Inter: {
    regular: "Inter-Regular",
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
  primary: fonts.Montserrat,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: fonts.Inter,
}
