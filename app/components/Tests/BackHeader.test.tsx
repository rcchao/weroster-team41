import { render, fireEvent, waitFor } from "@testing-library/react-native"
import { TamaguiProvider } from "tamagui"

import { BackHeader } from "@/components/BackHeader"
import config from "@/tamagui.config"

const mockNavigation = {
  goBack: jest.fn(),
}

jest.mock("@/components/Icon", () => ({
  Icon: ({ icon, color, testID }: any) => {
    const MockIcon = require("react-native").Text
    return <MockIcon testID={testID}>{`Icon: ${icon}, Color: ${color}`}</MockIcon>
  },
}))

jest.mock("@/components/BaseTopBar", () => ({
  BaseTopBar: ({ children }: any) => {
    const MockView = require("react-native").View
    return <MockView testID="base-top-bar">{children}</MockView>
  },
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <TamaguiProvider config={config} disableInjectCSS>
      {children}
    </TamaguiProvider>
  )
}

describe("BackHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const renderComponent = (props: any = {}) => {
    const defaultProps = {
      navigation: mockNavigation,
      title: "Test Title",
      ...props,
    }

    return render(
      <TestWrapper>
        <BackHeader {...defaultProps} />
      </TestWrapper>,
    )
  }

  describe("Basic Rendering", () => {
    it("renders with title", () => {
      const { getByText } = renderComponent()
      expect(getByText("Test Title")).toBeTruthy()
    })

    it("renders back button icon", () => {
      const { getByTestId } = renderComponent()
      expect(getByTestId("back-icon")).toBeTruthy()
    })

    it("renders base top bar", () => {
      const { getByTestId } = renderComponent()
      expect(getByTestId("base-top-bar")).toBeTruthy()
    })
  })

  describe("Navigation", () => {
    it("back button calls navigation.goBack", () => {
      const { getByTestId } = renderComponent()
      const backButton = getByTestId("back-button")
      fireEvent.press(backButton)
      expect(mockNavigation.goBack).toHaveBeenCalled()
    })

    it("displays correct title text", () => {
      const { getByText } = renderComponent({ title: "Custom Title" })
      expect(getByText("Custom Title")).toBeTruthy()
    })
  })

  describe("Save Button", () => {
    it("renders Save button when onSave is provided", () => {
      const mockOnSave = jest.fn()
      const { getByText } = renderComponent({ onSavePress: mockOnSave })
      expect(getByText("Save")).toBeTruthy()
    })

    it("does not render Save button when onSave is not provided", () => {
      const { queryByText } = renderComponent()
      expect(queryByText("Save")).toBeNull()
    })

    it("calls onSavePress when save button pressed", () => {
      const mockOnSavePress = jest.fn().mockResolvedValue(undefined)
      const { getByText } = renderComponent({ onSavePress: mockOnSavePress })
      const saveButton = getByText("Save")
      fireEvent.press(saveButton)
      expect(mockOnSavePress).toHaveBeenCalled()
    })

    it("navigates back after saved", async () => {
      const mockOnSavePress = jest.fn().mockResolvedValue(undefined)
      const { getByText } = renderComponent({ onSavePress: mockOnSavePress })
      const saveButton = getByText("Save")
      fireEvent.press(saveButton)

      await waitFor(() => {
        expect(mockNavigation.goBack).toHaveBeenCalled()
      })
    })

    it("shows saving state while saving", async () => {
      let resolveSave: () => void
      const mockOnSavePress = jest.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveSave = resolve
          }),
      )

      const { getByText, queryByText } = renderComponent({ onSavePress: mockOnSavePress })

      const saveButton = getByText("Save")
      fireEvent.press(saveButton)

      expect(queryByText("Saving...")).toBeTruthy()
      expect(queryByText("Save")).toBeNull()

      // Resolve the save promise
      resolveSave!()

      await waitFor(() => {
        expect(queryByText("Saving...")).toBeNull()
      })
    })
  })

  describe("Error Handling", () => {
    it("handles save errors", async () => {
      const mockOnSavePress = jest.fn().mockRejectedValue(new Error("Save failed"))
      const consoleSpy = jest.spyOn(console, "error").mockImplementation()

      const { getByText } = renderComponent({ onSavePress: mockOnSavePress })
      const saveButton = getByText("Save")
      fireEvent.press(saveButton)

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith("Save failed:", expect.any(Error))
      })

      expect(mockNavigation.goBack).not.toHaveBeenCalled()

      expect(getByText("Save")).toBeTruthy()
      consoleSpy.mockRestore()
    })

    it("prevents multiple save presses", async () => {
      let resolveSave: () => void
      const mockOnSavePress = jest.fn(
        () =>
          new Promise<void>((resolve) => {
            resolveSave = resolve
          }),
      )
      const { getByText } = renderComponent({ onSavePress: mockOnSavePress })
      const saveButton = getByText("Save")
      fireEvent.press(saveButton)
      fireEvent.press(saveButton)
      fireEvent.press(saveButton)

      expect(mockOnSavePress).toHaveBeenCalledTimes(1)
      resolveSave!()

      await waitFor(() => {
        expect(getByText("Save")).toBeTruthy()
      })
    })
  })
})
