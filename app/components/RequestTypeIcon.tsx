import { Group, useTheme } from "tamagui"

import { Icon, IconTypes } from "./Icon"

export const REQUEST_TYPE_ICON_MAP: Record<string, IconTypes> = {
  LEAVE: "leave",
  SWAP: "swap",
  ASSIGNMENT: "openShift",
  default: "meh",
}

export const REQUEST_TYPE_COLOR_MAP: Record<string, string> = {
  LEAVE: "secondary400",
  SWAP: "yellow400",
  ASSIGNMENT: "green500",
  default: "mono300",
}

interface RequestTypeIconProps {
  requestType: string
}

export const RequestTypeIcon = ({ requestType }: RequestTypeIconProps) => {
  const theme = useTheme()
  const iconColor = theme.white200.val

  const icon = REQUEST_TYPE_ICON_MAP[requestType] ?? REQUEST_TYPE_ICON_MAP["default"]
  const bgToken = REQUEST_TYPE_COLOR_MAP[requestType] ?? REQUEST_TYPE_COLOR_MAP["default"]
  const bgColor = theme[bgToken]?.val

  return (
    <Group
      testID="request-type-icon-container"
      width={74}
      height={74}
      bg={bgColor}
      size="$radius.4"
      alignItems="center"
      justifyContent="center"
    >
      <Group.Item>
        <Icon testID={`request-type-icon-${requestType}`} icon={icon} color={iconColor} size={24} />
      </Group.Item>
    </Group>
  )
}
