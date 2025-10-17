import { render, fireEvent } from "@testing-library/react-native"
import { TamaguiProvider, Theme } from "tamagui"

import { ThemeProvider } from "@/theme/context"

import config from "../../tamagui.config"
import { Lozenge, LOZENGE_CONFIG } from "../Lozenge"

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => (
  <TamaguiProvider config={config}>
    <Theme name="light">
      <ThemeProvider>{children}</ThemeProvider>
    </Theme>
  </TamaguiProvider>
)

const renderWithProviders = (ui: React.ReactElement) => {
  return render(ui, { wrapper: Providers })
}

describe("Lozenge", () => {
  it("renders correct text for each type", () => {
    Object.keys(LOZENGE_CONFIG).forEach((type) => {
      const { getByText } = renderWithProviders(<Lozenge type={type as any} active />)
      const expectedText = LOZENGE_CONFIG[type as keyof typeof LOZENGE_CONFIG].text
      expect(getByText(expectedText)).toBeTruthy()
    })
  })

  it("renders correct icon for each type", () => {
    const { getByTestId } = renderWithProviders(<Lozenge type="LEAVE" active />)
    expect(getByTestId("leave")).toBeTruthy()

    const { getByTestId: getByTestId2 } = renderWithProviders(<Lozenge type="SWAP" active />)
    expect(getByTestId2("swap")).toBeTruthy()

    const { getByTestId: getByTestId3 } = renderWithProviders(<Lozenge type="event" active />)
    expect(getByTestId3("openShift")).toBeTruthy()

    const { getByTestId: getByTestId4 } = renderWithProviders(<Lozenge type="ASSIGNMENT" active />)
    expect(getByTestId4("openShift")).toBeTruthy()
  })

  it("button disabled when inactive", () => {
    const { getByTestId } = renderWithProviders(<Lozenge type="LEAVE" active={false} />)
    const button = getByTestId("lozenge-LEAVE")
    expect(button.props.accessibilityState.disabled).toBe(true)
  })

  it("toggles selected state when pressed if active", () => {
    const { getByTestId } = renderWithProviders(<Lozenge type="LEAVE" active />)

    // check initial state
    let button = getByTestId("lozenge-LEAVE")
    expect(button.props.accessibilityState.selected).toBe(false)

    fireEvent.press(button)

    // should be updated state
    button = getByTestId("lozenge-LEAVE")
    expect(button.props.accessibilityState.selected).toBe(true)
  })

  it("calls onPress if pressed when active", () => {
    const onPressMock = jest.fn()
    const { getByTestId } = renderWithProviders(
      <Lozenge type="LEAVE" active onPress={onPressMock} />,
    )
    fireEvent.press(getByTestId("lozenge-LEAVE"))
    expect(onPressMock).toHaveBeenCalled()
  })

  it("doesn't call onPress when inactive", () => {
    const onPressMock = jest.fn()
    const { getByTestId } = renderWithProviders(
      <Lozenge type="LEAVE" active={false} onPress={onPressMock} />,
    )
    fireEvent.press(getByTestId("lozenge-LEAVE"))
    expect(onPressMock).not.toHaveBeenCalled()
  })
})
