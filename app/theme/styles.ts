import { ViewStyle } from "react-native"
import { TextStyle } from "react-native"

import { spacing } from "./spacing"
import type { ThemedStyle } from "./types"

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: "row" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,

  container: {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,

  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
}

export const $topRightIcons: ThemedStyle<TextStyle> = () => ({
  position: "absolute",
  top: 16,
  right: 16,
  flexDirection: "row",
  alignItems: "center",
  zIndex: 1,
})

// Currently this is just padding
export const $headerIcons: ThemedStyle<TextStyle> = () => ({
  marginRight: spacing.md,
})
