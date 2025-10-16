// import { useState } from "react"
import { Pressable, ViewStyle } from "react-native"
import { Controller, useForm } from "react-hook-form"
import { Input, XStack, useTheme } from "tamagui"

import { Icon } from "@/components/Icon"
import { tamaguiConfig } from "@/tamagui.config"

interface SearchHeaderProps {
  onSearch: (query: string) => void
  style?: ViewStyle
}

export function SearchHeader({ onSearch, style }: SearchHeaderProps) {
  const theme = useTheme()

  const searchInput = useForm<{ query: string }>({
    defaultValues: {
      query: "",
    },
  })

  // Optional isFocused state to manage input focus styling
  // const [isFocused, setIsFocused] = useState(false)

  return (
    <XStack
      alignItems="center"
      justifyContent="center"
      paddingHorizontal="$4"
      paddingVertical="$3"
      backgroundColor={tamaguiConfig.tokens.color.white100}
      position="relative"
      style={style}
    >
      <Pressable onPress={() => {}}>
        <Icon icon="sliders" size={24} color={theme.mono900.val} />
      </Pressable>
      <Controller
        control={searchInput.control}
        name="query"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            unstyled
            flex={1}
            marginHorizontal="$2"
            paddingVertical="$2"
            paddingHorizontal="$3"
            borderRadius="$7"
            borderWidth={1}
            borderColor={tamaguiConfig.tokens.color.white900}
            backgroundColor={tamaguiConfig.tokens.color.white900}
            placeholder="Search"
            placeholderTextColor={theme.mono900.val}
            fontSize={16}
            value={value}
            onChangeText={onChange}
            onBlur={() => {
              onBlur()
              //setIsFocused(false)
            }}
            //onFocus={() => setIsFocused(true)}
            returnKeyType="search"
            onSubmitEditing={() => {
              onSearch(value)
              searchInput.reset()
              // setIsFocused(false)
            }}
          />
        )}
      />
    </XStack>
  )
}
