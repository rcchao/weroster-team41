import { FC, useRef, useState } from "react"
import { ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { Input, Image, YStack, Anchor } from "tamagui"

import { HeaderText } from "@/components/HeaderText"
import { PressableIcon } from "@/components/Icon"
import { Screen } from "@/components/Screen"
import { SubmitButton } from "@/components/SubmitButton"
import { useAuth } from "@/context/AuthContext"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { tamaguiConfig } from "@/tamagui.config"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { UserInput } from "../components/UserInput"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

type LoginValues = {
  domain?: string
  email: string
  password: string
}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const passwordInput = useRef<React.ComponentRef<typeof Input>>(null)
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
    setError,
    clearErrors,
  } = useForm<LoginValues>({
    defaultValues: { domain: "", email: "", password: "" },
    mode: "onChange",
  })

  const onSubmit = async ({ email, password }: LoginValues) => {
    clearErrors()
    const success = await login(email.trim(), password)
    if (!success) {
      setError("password", {
        type: "server",
        message: "Incorrect email or password.",
      })
      console.log("Authentication failed.")
      passwordInput.current?.focus()
    }
  }
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <YStack alignItems="stretch" padding={30} gap="$space.8">
        <YStack alignItems="center" gap={20} marginTop={52}>
          <Image
            testID="logo"
            source={require("../../assets/images/logo.png")}
            height={125}
            width={175}
            objectFit="contain"
          />
          {/* TODO: Replace this Welcome text once typography is available */}
          <HeaderText variant="h2">Welcome</HeaderText>
        </YStack>
        <YStack gap={24}>
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
                borderColor={tamaguiConfig.tokens.color.mono400}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required.",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email.",
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
                borderColor={tamaguiConfig.tokens.color.mono400}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required.",
              minLength: { value: 6, message: "Min 6 characters are required." },
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
                borderColor={tamaguiConfig.tokens.color.mono400}
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
        <YStack alignItems="center">
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
