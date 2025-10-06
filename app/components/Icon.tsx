import {
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"
import {
  AlignJustify,
  Anchor,
  Bell,
  Building2,
  Calendar,
  CalendarClock,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleDashed,
  CircleSlash,
  CircleUserRound,
  ClipboardList,
  Clock3,
  Copy,
  Cross,
  Eye,
  EyeOff,
  Heart,
  House,
  LayoutGrid,
  LogOut,
  Mail,
  MapPin,
  Meh,
  MessageCircleMore,
  MessageCircleWarning,
  Moon,
  MoonStar,
  PencilLine,
  Phone,
  PhoneCall,
  PlaneTakeoff,
  Plus,
  Search,
  Settings,
  Shuffle,
  Sliders,
  Stethoscope,
  Sun,
  Sunrise,
  Sunset,
  User2,
  UsersRound,
  X,
  Zap,
} from "lucide-react-native"

import { useAppTheme } from "@/theme/context"

export type IconTypes = keyof typeof iconRegistry

type BaseIconProps = {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>
}

type PressableIconProps = Omit<TouchableOpacityProps, "style"> & BaseIconProps
export type IconProps = Omit<ViewProps, "style"> & BaseIconProps

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity />
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {PressableIconProps} props - The props for the `PressableIcon` component.
 * @returns {JSX.Element} The rendered `PressableIcon` component.
 */
export function PressableIcon(props: PressableIconProps) {
  const { icon, color, size, containerStyle: $containerStyleOverride, ...pressableProps } = props

  const { theme } = useAppTheme()

  const LucideIcon = iconRegistry[icon]

  return (
    <TouchableOpacity {...pressableProps} style={$containerStyleOverride}>
      <LucideIcon color={color ?? theme.colors.text} size={size ?? 24} />
    </TouchableOpacity>
  )
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <View />, use `PressableIcon` if you want to react to input
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Icon/}
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const { icon, color, size, containerStyle: $containerStyleOverride, ...viewProps } = props

  const { theme } = useAppTheme()

  const LucideIcon = iconRegistry[icon]

  if (!LucideIcon) {
    throw new Error(`Icon "${icon}" not found in iconRegistry.`)
  }

  return (
    <View {...viewProps} style={$containerStyleOverride}>
      <LucideIcon color={color ?? theme.colors.text} size={size ?? 24} />
    </View>
  )
}

export const iconRegistry = {
  alignJustify: AlignJustify,
  anchor: Anchor,
  teams: UsersRound,
  requests: MessageCircleWarning,
  roster: CalendarDays,
  house: House,
  notifs: Bell,
  building: Building2,
  calendar: Calendar,
  openShift: CalendarClock,
  camera: Camera,
  check: Check,
  checkCircle: CheckCircle2,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight,
  circle: Circle,
  circleDashed: CircleDashed,
  circleSlash: CircleSlash,
  circleUser: CircleUserRound,
  clipboard: ClipboardList,
  clock: Clock3,
  copy: Copy,
  cross: Cross,
  heart: Heart,
  layoutGrid: LayoutGrid,
  logOut: LogOut,
  mail: Mail,
  location: MapPin,
  message: MessageCircleMore,
  moon: Moon,
  afterHours: MoonStar,
  edit: PencilLine,
  phone: Phone,
  phoneCall: PhoneCall,
  leave: PlaneTakeoff,
  plus: Plus,
  search: Search,
  settings: Settings,
  swap: Shuffle,
  sliders: Sliders,
  stethoscope: Stethoscope,
  sun: Sun,
  am: Sunrise,
  pm: Sunset,
  user2: User2,
  lucideX: X,
  zap: Zap,
  meh: Meh,
  view: Eye,
  hidden: EyeOff,
}
