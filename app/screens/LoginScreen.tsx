import { FC, useRef, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { TextInput, TextStyle, ViewStyle, StyleSheet } from "react-native"
import { Text, Image, YStack } from "tamagui"

import { Button } from "@/components/Button"
import { PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Controller, useForm } from "react-hook-form"

import { UserInput } from "../components/UserInput"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

const styles = StyleSheet.create({
  image: {
    height: 125,
    resizeMode: "contain",
    width: 175,
  },
  yStack: {
    alignItems: "stretch",
    padding: 30,
  },
  logoWelcome: {
    alignItems: "center",
    gap: 20,
  },
})

type LoginValues = {
  domain?: string
  email: string
  password: string
}

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

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginValues>({
    defaultValues: { domain: "", email: "", password: "" },
    mode: "onChange",
  })

  const onSubmit = async ({ email, password }: LoginValues) => {
    const success = await login(email, password)
    if (!success) console.log("Authentication failed.")
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <YStack style={styles.yStack} gap="$space.8">
        <YStack style={styles.logoWelcome}>
          <Image source={require("../../assets/images/logo.png")} style={styles.image} />
          {/* TODO: Replace this Welcome text once typography is available */}
          <Text>Welcome</Text>
        </YStack>

        <Controller
          control={control}
          name="domain"
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <UserInput
              ref={ref}
              placeholder="Domain"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          }}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <UserInput
              ref={ref}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              errorMessage={errors.email?.message}
              returnKeyType="next"
              onSubmitEditing={() => passwordInput.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: { value: 6, message: "Min 6 characters" },
          }}
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <UserInput
              ref={passwordInput}
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isPasswordHidden}
              errorMessage={errors.password?.message}
              onSubmitEditing={handleSubmit(onSubmit)}
              RightAccessory={() => (
                // TODO: Replace this with a Tamagui Button when icon is made available
                <PressableIcon
                  icon={isPasswordHidden ? "view" : "hidden"}
                  color={colors.palette.neutral800}
                  size={20}
                  onPress={() => setIsPasswordHidden((v) => !v)}
                />
              )}
            />
          )}
        />

        <Button
          text="Log In"
          style={themed($button)}
          preset="reversed"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isSubmitting}
        />
      </YStack>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})
