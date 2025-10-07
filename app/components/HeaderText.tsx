import { Text, styled } from "tamagui"

export const HeaderText = styled(Text, {
  name: "HeaderText",
  fontFamily: "$heading",
  color: "$color",
  letterSpacing: 0,
  fontWeight: "700",

  variants: {
    variant: {
      h1: {
        fontSize: "$6",
        lineHeight: "$6",
      },
      h2: {
        fontSize: "$4",
        lineHeight: "$5",
      },
      h3: {
        fontSize: "$3",
        lineHeight: "$4",
      },
    },
  } as const,
  defaultVariants: {
    variant: "h1",
  },
})
