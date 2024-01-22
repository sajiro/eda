import { render /* fireEvent */ } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: () => ({
    mutate: jest.fn(),
    status: "success",
    error: null,
    data: { access_token: "mock_access_token" },
  }),
}));

Object.assign(global, { TextDecoder, TextEncoder });
const queryClient = new QueryClient();
global.TextDecoder = jest.fn();
jest.mock("./components/MapScreen", () => () => <div>Map component</div>);

describe("App", () => {
  it("renders Map component", async () => {
    const { findByText } = render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    const mapElement = await findByText(/Map component/i);
    expect(mapElement).toBeInTheDocument();
  });
});
