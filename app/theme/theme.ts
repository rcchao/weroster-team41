import { colors as colorsLight } from "./colors"
import { spacing as spacingLight } from "./spacing"
import { timing } from "./timing"
import type { Theme } from "./types"
import { typography } from "./typography"

export const lightTheme: Theme = {
  colors: colorsLight,
  spacing: spacingLight,
  typography,
  timing,
  isDark: false,
}
