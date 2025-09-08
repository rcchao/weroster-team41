import { FC, useRef, useState } from "react"
import { TextInput, ViewStyle, StyleSheet } from "react-native"
import { Text, Image, YStack, Anchor } from "tamagui"

import { PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Controller, useForm } from "react-hook-form"

import { UserInput } from "../components/UserInput"
import { SubmitButton } from "@/components/SubmitButton"

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
  forgotPassword: {
    alignItems: "center",
  },
})

type LoginValues = {
  domain?: string
  email: string
  password: string
}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const passwordInput = useRef<TextInput>(null)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const { login } = useAuth()
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
    const success = await login(email.trim(), password)
    if (!success) console.log("Authentication failed.")
  }
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <YStack style={styles.yStack} gap="$space.8">
        <YStack style={styles.logoWelcome}>
          <Image source={require("../../assets/images/logo.png")} style={styles.image} />
          {/* TODO: Replace this Welcome text once typography is available */}
          <Text>Welcome</Text>
        </YStack>
        <YStack gap="$space.5">
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
            render={({ field: { value, onChange, onBlur } }) => (
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
        </YStack>

        <YStack marginBlockStart={"$space.10"}>
          <SubmitButton
            text="Login"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isSubmitting}
          />
        </YStack>
        <YStack style={styles.forgotPassword}>
          {/* This Anchor is current dumb */}
          <Anchor color="$accent500">Forgot password?</Anchor>
        </YStack>
      </YStack>
    </Screen>
  )
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})
