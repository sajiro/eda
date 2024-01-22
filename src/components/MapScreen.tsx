import mapboxgl from "mapbox-gl";
import MapComponent from "./Map";
import SearchComponent from "./SearchList";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { searchArchive } from "@/services/service";
import { Coordinates, SearchData } from "@/models/models";
import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { convertDateRangeToString, getCurrentDateRange } from "@/lib/utils";

type MapScreenProps = {
  token: string;
};

const MapScreenComponent = ({ token }: MapScreenProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: SearchData | Record<string, unknown>) =>
      searchArchive(token, data),
    mutationKey: ["searchArchive"],
  });

  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [datetime, setDatetime] = useState<DateRange | undefined>(undefined);
  const [geometry, setGeometry] = useState<GeoJSON.Geometry | null>(null);

  useEffect(() => {
    mutation.mutate(searchData || {});
  }, [searchData]);

  useEffect(() => {
    let searchValues: SearchData | null = null;
    if (geometry?.type === "Polygon") {
      searchValues = {
        datetime: datetime
          ? convertDateRangeToString(datetime)
          : getCurrentDateRange(),
        intersects: {
          type: geometry.type,
          coordinates: [
            geometry.coordinates[0].map((position) => [
              position[0],
              position[1],
            ]),
          ],
        },
      };
    }
    if (searchValues) {
      setSearchData(searchValues);
    }
  }, [datetime, geometry]);

  const handleSearch = (searchArea: mapboxgl.MapboxGeoJSONFeature | null) => {
    if (searchArea?.geometry.type === "Polygon") {
      setGeometry(searchArea.geometry);
    }

    queryClient.invalidateQueries({ queryKey: ["searchArchive"] });
  };

  const onHandleDateChange = useCallback(
    (date: DateRange | undefined, isSearchNow: boolean) => {
      if (!date) return;
      if (isSearchNow) {
        const searchValues: SearchData = {
          datetime: convertDateRangeToString(date),
        };
        mutation.mutate(searchValues);
        setGeometry(null);
      }
      setDatetime(date);
    },
    [mutation]
  );

  return (
    <>
      <SearchComponent
        onCoordinateChange={(coordinates: Coordinates) =>
          setCoordinates(coordinates)
        }
        data={
          mutation as UseMutationResult<unknown, Error, SearchData, unknown>
        }
        onDateChange={onHandleDateChange}
        dateCurrent={datetime}
      />
      <MapComponent onSearch={handleSearch} coordinates={coordinates} />
    </>
  );
};

export default MapScreenComponent;
