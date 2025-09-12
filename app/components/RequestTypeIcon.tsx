import { StyleSheet } from "react-native"
import { Group, useTheme } from "tamagui"

import { Icon, IconTypes } from "./Icon"

const styles = StyleSheet.create({
  align: { alignItems: "center", justifyContent: "center" },
})

const REQUEST_TYPE_ICON: Record<string, IconTypes> = {
  leave: "leave",
  swap: "swap",
  openShift: "openShift",
}

const REQUEST_TYPE_COLOR: Record<string, string> = {
  leave: "secondary400",
  swap: "yellow400",
  openShift: "green500",
}

type RequestTypeIconProps = {
  requestType: string
}

export const RequestTypeIcon = (props: RequestTypeIconProps) => {
  const theme = useTheme()
  const iconColor = theme.white200.val

  const icon = REQUEST_TYPE_ICON[props.requestType]
  const bgToken = REQUEST_TYPE_COLOR[props.requestType]
  const bgColor = theme[bgToken]?.val

  return (
    <Group width={74} height={74} bg={bgColor} size="$radius.4" style={styles.align}>
      <Group.Item>
        <Icon icon={icon} color={iconColor} size={24} />
      </Group.Item>
    </Group>
  )
}
