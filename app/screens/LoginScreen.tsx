import { FC, useRef, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { TextInput, TextStyle, ViewStyle } from "react-native"
import { H1, Text } from "tamagui"

import { Button } from "../components/Button"
import { PressableIcon } from "../components/Icon"
import { Screen } from "../components/Screen"
import { TextField } from "../components/TextField"
import { useAuth } from "../context/AuthContext"
import type { AppStackScreenProps } from "../navigators/AppNavigator"
import { useAppTheme } from "../theme/context"
import type { ThemedStyle } from "../theme/types"
import { FigmaText } from "../theme/typography"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const passwordInput = useRef<TextInput>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const { login, error } = useAuth()
  const {
    themed,
    theme: { colors },
  } = useAppTheme()

  const handleSubmit = async () => {
    if (!email || !password) {
      console.log("Email and password are required.")
      return
    }

    const success = await login(email, password)

    if (success) {
      // Navigation will be handled by your navigator
      // checking isAuthenticated from context
    } else {
      console.log("Authentication failed.")
    }
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <H1>Welcome back!</H1>
      <Text>Log in to your account</Text>
      <FigmaText variant="body">FigmaText</FigmaText>

      <TextField
        value={email}
        onChangeText={setEmail}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        label="Email"
        placeholder="Enter your email"
        status={error ? "error" : undefined}
        onSubmitEditing={() => passwordInput.current?.focus()}
      />

      <TextField
        ref={passwordInput}
        value={password}
        onChangeText={setPassword}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isPasswordHidden}
        label="Password"
        placeholder="Enter your password"
        onSubmitEditing={handleSubmit}
        RightAccessory={(props) => (
          <PressableIcon
            icon={isPasswordHidden ? "anchor" : "anchor"} //placeholder icon
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
        )}
      />

      <Button
        text={"Log In"}
        style={themed($button)}
        preset="reversed"
        onPress={handleSubmit}
        disabled={!email || !password}
      />
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $heading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})
