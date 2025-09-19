import { render, fireEvent } from "@testing-library/react-native"
import { TamaguiProvider, Theme } from "tamagui"

import { ThemeProvider } from "@/theme/context"

import config from "../../tamagui.config"
import { Lozenge } from "../Lozenge"

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
    const { getByText } = renderWithProviders(<Lozenge type="leave" active />)
    expect(getByText("Leave")).toBeTruthy()

    const { getByText: getByText2 } = renderWithProviders(<Lozenge type="swap" active />)
    expect(getByText2("Swap")).toBeTruthy()

    const { getByText: getByText3 } = renderWithProviders(<Lozenge type="event" />)
    expect(getByText3("Event")).toBeTruthy()

    const { getByText: getByText4 } = renderWithProviders(<Lozenge type="available" />)
    expect(getByText4("Available")).toBeTruthy()

    const { getByText: getByText5 } = renderWithProviders(<Lozenge type="requested" />)
    expect(getByText5("Requested")).toBeTruthy()

    const { getByText: getByText6 } = renderWithProviders(<Lozenge type="urgent" />)
    expect(getByText6("Urgent")).toBeTruthy()

    const { getByText: getByText7 } = renderWithProviders(<Lozenge type="approved" />)
    expect(getByText7("Approved")).toBeTruthy()

    const { getByText: getByText8 } = renderWithProviders(<Lozenge type="awaiting" />)
    expect(getByText8("Awaiting")).toBeTruthy()

    const { getByText: getByText9 } = renderWithProviders(<Lozenge type="declined" />)
    expect(getByText9("Declined")).toBeTruthy()

    const { getByText: getByText10 } = renderWithProviders(<Lozenge type="assigned" />)
    expect(getByText10("Assigned")).toBeTruthy()

    const { getByText: getByText11 } = renderWithProviders(<Lozenge type="openShift" />)
    expect(getByText11("OpenShift")).toBeTruthy()
  })

  it("renders correct icon for each type", () => {
    const { getByTestId } = renderWithProviders(<Lozenge type="leave" active />)
    expect(getByTestId("leave")).toBeTruthy()

    const { getByTestId: getByTestId2 } = renderWithProviders(<Lozenge type="swap" active />)
    expect(getByTestId2("swap")).toBeTruthy()

    const { getByTestId: getByTestId3 } = renderWithProviders(<Lozenge type="event" active />)
    expect(getByTestId3("openShift")).toBeTruthy()

    const { getByTestId: getByTestId4 } = renderWithProviders(<Lozenge type="openShift" active />)
    expect(getByTestId4("openShift")).toBeTruthy()
  })

  it("button disabled when inactive", () => {
    const { getByTestId } = renderWithProviders(<Lozenge type="leave" active={false} />)
    const button = getByTestId("lozenge-leave")
    expect(button.props.accessibilityState.disabled).toBe(true)
  })

  it("toggles selected state when pressed if active", () => {
    const { getByTestId } = renderWithProviders(<Lozenge type="leave" active />)

    // check initial state
    let button = getByTestId("lozenge-leave")
    expect(button.props.accessibilityState.selected).toBe(false)

    fireEvent.press(button)

    // should be updated state
    button = getByTestId("lozenge-leave")
    expect(button.props.accessibilityState.selected).toBe(true)
  })

  it("calls onPress if pressed when active", () => {
    const onPressMock = jest.fn()
    const { getByTestId } = renderWithProviders(
      <Lozenge type="leave" active onPress={onPressMock} />,
    )
    fireEvent.press(getByTestId("lozenge-leave"))
    expect(onPressMock).toHaveBeenCalled()
  })

  it("doesn't call onPress when inactive", () => {
    const onPressMock = jest.fn()
    const { getByTestId } = renderWithProviders(
      <Lozenge type="leave" active={false} onPress={onPressMock} />,
    )
    fireEvent.press(getByTestId("lozenge-leave"))
    expect(onPressMock).not.toHaveBeenCalled()
  })
})
