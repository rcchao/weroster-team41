import { ViewStyle } from "react-native"
import { TextStyle } from "react-native"

import tamaguiConfig from "@/tamagui.config"

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

  barContainer: {
    paddingTop: spacing.lg + spacing.xl,
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

export const $container: ViewStyle = { flex: 1 }

export const $headerContainer: ViewStyle = { overflow: "visible", zIndex: 999 }

export const $fabButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  backgroundColor: colors.palette.neutral100,
  borderRadius: tamaguiConfig.tokens.radius[7].val,
  borderWidth: 0,
  bottom: spacing.md,
  elevation: 5,
  height: 52,
  justifyContent: "center",
  padding: spacing.md,
  position: "absolute",
  right: spacing.lg,
  shadowColor: colors.palette.overlay50,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 4,
  width: 52,
})
