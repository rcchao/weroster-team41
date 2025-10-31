import { useState, memo } from "react"
import { ViewStyle } from "react-native"
import { Input, XStack, useTheme } from "tamagui"

import { tamaguiConfig } from "@/tamagui.config"

interface SearchHeaderProps {
  onSearch: (query: string) => void
  style?: ViewStyle
}

const SearchHeaderComponent = ({ onSearch, style }: SearchHeaderProps) => {
  const theme = useTheme()
  const [searchValue, setSearchValue] = useState("")

  const handleTextChange = (text: string) => {
    setSearchValue(text)
    onSearch(text)
  }

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
        placeholder="Search name, designation or location"
        placeholderTextColor={theme.mono900.val}
        fontSize={14}
        value={searchValue}
        onChangeText={handleTextChange}
        returnKeyType="search"
        onSubmitEditing={() => {
          onSearch(searchValue)
        }}
      />
    </XStack>
  )
}

export const SearchHeader = memo(SearchHeaderComponent)
