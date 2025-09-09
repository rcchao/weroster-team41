import { styled, Text } from "tamagui"

export const BodyText = styled(Text, {
  fontFamily: "$body",

  variants: {
    variant: {
      body: {
        fontSize: "$3",
        lineHeight: "$4",
        letterSpacing: 0,
        fontWeight: "400",
      },
      body2: {
        fontSize: "$2",
        lineHeight: "$3",
        fontWeight: "400",
        letterSpacing: 0,
      },
      body3: {
        fontSize: "$1",
        lineHeight: "$2",
        letterSpacing: 0,
      },
      body4: {
        fontSize: "$1",
        lineHeight: "$1",
        letterSpacing: 0,
      },
    },
  } as const,

  defaultVariants: {
    variant: "body",
  },
})
