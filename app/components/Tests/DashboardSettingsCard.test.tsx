import { render, fireEvent } from "@testing-library/react-native"
import { TamaguiProvider } from "tamagui"

import { DashboardSettingsCard } from "@/components/DashboardSettingsCard"
import config from "@/tamagui.config"
import { ThemeProvider } from "@/theme/context"

jest.mock("@/components/Icon", () => ({
  Icon: ({ icon, testID }: any) => {
    const MockIcon = require("react-native").Text
    return <MockIcon testID={testID}>{`Icon: ${icon}`}</MockIcon>
  },
}))

jest.mock("@/components/Text", () => ({
  Text: ({ children, style }: any) => {
    const MockText = require("react-native").Text
    return (
      <MockText style={style} testID="mock-text">
        {children}
      </MockText>
    )
  },
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config} disableInjectCSS>
    <ThemeProvider>{children}</ThemeProvider>
  </TamaguiProvider>
)

describe("DashboardSettingsCard", () => {
  const defaultProps = {
    title: "Test Card",
    subtitle: "Test Subtitle",
    checked: false,
    onToggle: jest.fn(),
    onDrag: jest.fn(),
  }

  const renderComponent = (props = {}) => {
    const finalProps = { ...defaultProps, ...props }
    return render(
      <TestWrapper>
        <DashboardSettingsCard {...finalProps} />
      </TestWrapper>,
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders title and subtitle", () => {
    const { getByText } = renderComponent()
    expect(getByText("Test Card")).toBeTruthy()
    expect(getByText("Test Subtitle")).toBeTruthy()
  })

  it("renders checkbox correctly", () => {
    const { getByTestId } = renderComponent({ checked: true })
    const checkbox = getByTestId("checkbox")
    expect(checkbox.props["aria-checked"]).toBe(true)
  })

  it("calls onToggle when checkbox pressed", () => {
    const mockOnToggle = jest.fn()
    const { getByTestId } = renderComponent({ onToggle: mockOnToggle })
    const checkbox = getByTestId("checkbox")
    fireEvent.press(checkbox)
    expect(mockOnToggle).toHaveBeenCalled()
  })

  it("calls onDrag when drag icon pressed", () => {
    const mockOnDrag = jest.fn()
    const { getByText } = renderComponent({ onDrag: mockOnDrag })
    const dragIcon = getByText("Icon: alignJustify")
    fireEvent.press(dragIcon.parent)
    expect(mockOnDrag).toHaveBeenCalled()
  })
})
