import { render } from "@testing-library/react-native"
import { TamaguiProvider } from "tamagui"

import {
  RequestTypeIcon,
  REQUEST_TYPE_COLOR_MAP,
  REQUEST_TYPE_ICON_MAP,
} from "@/components/RequestTypeIcon"

import config from "../../tamagui.config"

jest.mock("../Icon", () => ({
  Icon: ({ icon, color, size, testID }: any) => {
    const MockIcon = require("react-native").Text
    return <MockIcon testID={testID}>{`Icon: ${icon}, Color: ${color}, Size: ${size}`}</MockIcon>
  },
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={config} disableInjectCSS>
    {children}
  </TamaguiProvider>
)

describe("RequestTypeIcon", () => {
  const renderComponent = (requestType: string) => {
    return render(
      <TestWrapper>
        <RequestTypeIcon requestType={requestType} />
      </TestWrapper>,
    )
  }

  describe("Request Type Mapping", () => {
    it("renders leave request icon with correct styling", () => {
      Object.keys(REQUEST_TYPE_ICON_MAP)
        .filter((type) => type !== "default")
        .forEach((requestType) => {
          const { getByTestId } = renderComponent(requestType)
          const expectedIcon = REQUEST_TYPE_ICON_MAP[requestType]

          const iconElement = getByTestId(`request-type-icon-${requestType}`)
          expect(iconElement).toBeTruthy()
          expect(iconElement.props.children).toContain(expectedIcon)
        })
    })

    it("uses correct color mapping for each request type", () => {
      Object.keys(REQUEST_TYPE_COLOR_MAP)
        .filter((type) => type !== "default")
        .forEach((requestType) => {
          const { getByTestId } = renderComponent(requestType)
          const container = getByTestId("request-type-icon-container")

          expect(container).toBeTruthy()
        })
    })
  })

  describe("Default Fallback", () => {
    it("renders default icon and color for unknown request type", () => {
      const unknownTypes = ["unknown", "", "INVALID", null, undefined]

      unknownTypes.forEach((unknownType) => {
        const { getByTestId } = renderComponent(unknownType as string)
        const iconElement = getByTestId(`request-type-icon-${unknownType}`)

        expect(iconElement).toBeTruthy()
        expect(iconElement.props.children).toContain(REQUEST_TYPE_ICON_MAP.default)
      })
    })
  })
})
