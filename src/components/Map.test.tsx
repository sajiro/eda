import { render, act } from "@testing-library/react";
import Map from "./Map";
import { Coordinates } from "@/models/models";

jest.mock("mapbox-gl", () => ({
  Map: jest.fn(() => ({
    addControl: jest.fn(),
  })),
  NavigationControl: jest.fn(),
  FullscreenControl: jest.fn(),
}));

jest.mock("@mapbox/mapbox-gl-draw", () => {
  return {
    default: function () {
      return { onAdd: jest.fn() };
    },
  };
});

describe("Map", () => {
  it("renders correctly", () => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        getCurrentPosition: jest.fn().mockImplementation((success) =>
          Promise.resolve(
            success({
              coords: {
                latitude: 51.1,
                longitude: 45.3,
              },
            })
          )
        ),
      },
      writable: true,
    });

    const mockOnSearch = jest.fn();
    const mockCoordinates: Coordinates | null = [
      [
        [-110.48369598389, 24.397663116455],
        [-110.4847946167, 24.124258041382],
        [-110.16482543945, 24.122844696045],
        [-110.16303253174, 24.396230697632],
        [-110.48369598389, 24.397663116455],
      ],
    ];

    act(() => {
      render(<Map onSearch={mockOnSearch} coordinates={mockCoordinates} />);
    });
  });
});
