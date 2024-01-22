import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { UseMutationResult } from "@tanstack/react-query";
import { Coordinates, SearchData } from "@/models/models";
import { Progress } from "./ui/progress";
import { DatePickerWithRange } from "./ui/datepicker";
import { useCallback, useState } from "react";
import { DateRange } from "react-day-picker";

type SearchComponentProps = {
  data: UseMutationResult<unknown, Error, SearchData, unknown>;
  onCoordinateChange: (coordinates: Coordinates) => void;
  onDateChange?: (date: DateRange | undefined, isSearchNow: boolean) => void;
  dateCurrent?: DateRange | undefined;
};

const SearchListComponent = ({
  data,
  onCoordinateChange,
  onDateChange,
  dateCurrent,
}: SearchComponentProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked);
    },
    []
  );
  const handleDateChange = useCallback(
    (date: DateRange | undefined) => {
      if (onDateChange) {
        onDateChange(date, isChecked);
      }
    },
    [onDateChange, isChecked]
  );

  if (data.status === "pending") {
    return <Progress />;
  }

  if (data.status === "error") {
    return <div>An error occurred</div>;
  }

  if (data.status === "success") {
    return (
      <div className="h-screen w-1/4 bg-white bg-opacity-50 absolute top-0 h-75 z-10 p-2 px-6 bg-white-500">
        <div>
          <p className="mb-3 text-xs h-8 text-primary-500 font-semibold">{`Youre current search config will search by date ${
            !isChecked ? "and polygon" : "only"
          }`}</p>
          <div>
            <label className="text-sm">
              <input
                className="mr-2"
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
              />
              Search by date
            </label>
          </div>
          <DatePickerWithRange
            className="w-full mb-4 mt-4 date-picker"
            dateSelected={dateCurrent}
            onDateChange={handleDateChange}
            isSearchByDate={isChecked}
          />
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-23vh)]">
          {(data.data as GeoJSON.FeatureCollection<GeoJSON.Geometry, null>)
            .features.length === 0 && (
            <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-2xl m-3 p-3">
              <div className="p-2">
                <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold">
                  No Data
                </div>
                <p className="mt-2 text-gray-500 text-xs">
                  There is currently no data available for this section. Please
                  check back later.
                </p>
              </div>
            </div>
          )}
          {(
            data.data as GeoJSON.FeatureCollection<GeoJSON.Geometry, null>
          ).features // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((feature: any) => (
              //TODO remove any
              <div
                key={feature.id}
                onClick={() => onCoordinateChange(feature.geometry.coordinates)}
                className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-2xl m-3 p-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="p-2">
                  <div className="uppercase tracking-wide text-sm text-primary-500 font-semibold">
                    {feature.properties.title}
                  </div>
                  <p className="mt-2 text-gray-500 text-xs mb-2">Coordinates</p>
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 px-2 py-2 text-xs">
                          Latitude
                        </th>
                        <th className="border px-4 px-2 py-2 text-xs">
                          Longitude
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {feature.geometry.coordinates[0].map(
                        (coordinate: [number, number], idx: number) => (
                          <tr key={idx} className="bg-gray-100">
                            <td className="border px-2 py-2 text-xs">
                              {coordinate[0]}
                            </td>
                            <td className="border px-2 py-2 text-xs">
                              {coordinate[1]}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
};

export default SearchListComponent;
