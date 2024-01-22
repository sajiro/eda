import { render } from "@testing-library/react";
import { UseMutationResult } from "@tanstack/react-query";
import { SearchData } from "@/models/models";
import SearchListComponent from "./SearchList";

describe("SearchComponent", () => {
  it.skip("renders correctly", () => {
    const mockData: UseMutationResult<unknown, Error, SearchData, unknown> = {
      isError: false,
      isSuccess: true,
      data: {}, // replace with appropriate mock data
      error: null,
      mutate: jest.fn(),
      mutateAsync: jest.fn(),
      reset: jest.fn(),
      // isLoading: false, // Add the isLoading property
    };

    const mockOnCoordinateChange = jest.fn();
    const mockOnDateChange = jest.fn();

    const { getByRole } = render(
      <SearchListComponent
        data={mockData}
        onCoordinateChange={mockOnCoordinateChange}
        onDateChange={mockOnDateChange}
      />
    );
  });
});
