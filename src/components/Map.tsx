import { useEffect, useRef, useState } from "react";
import mapboxgl, { MapboxGeoJSONFeature } from "mapbox-gl";
import { MAP_TOKEN } from "../constants/constant";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Coordinates } from "@/models/models";

mapboxgl.accessToken = MAP_TOKEN;

type MapProps = {
  onSearch: (searchArea: mapboxgl.MapboxGeoJSONFeature | null) => void;
  coordinates?: Coordinates | null;
};

const MapComponent = ({ onSearch, coordinates }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const draw = useRef<MapboxDraw | null>(null);

  useEffect(() => {
    if (coordinates && draw.current) {
      draw.current.add({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: coordinates,
        },
        properties: {},
      });
      if (map.current) {
        map.current.flyTo({
          center: [coordinates[0][0][0], coordinates[0][0][1]],
          zoom: 10,
        });
      }
    }
  }, [coordinates]);

  const [lng, setLng] = useState<number>(-70.9);
  const [lat, setLat] = useState<number>(42.35);
  const [zoom, setZoom] = useState<number>(9);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });
  }, []);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });
    map.current.addControl(draw.current);

    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(new mapboxgl.FullscreenControl());

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    if (marker.current) marker.current.remove();
    marker.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!map.current || !draw.current) return;
    map.current.on("move", () => {
      if (map.current) {
        setLng(Number(map.current.getCenter().lng.toFixed(4)));
        setLat(Number(map.current.getCenter().lat.toFixed(4)));
        setZoom(Number(map.current.getZoom().toFixed(2)));
      }
    });

    const updateArea = () => {
      const data = draw.current?.getAll();
      if (data && data.features.length > 0) {
        onSearch(data.features[0] as MapboxGeoJSONFeature);
      }
    };

    map.current.on("draw.create", updateArea);
    map.current.on("draw.update", updateArea);

    return () => {
      if (!map.current) return;
      map.current.off("draw.create", updateArea);
      map.current.off("draw.update", updateArea);
    };
  }, []);

  return (
    <>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </>
  );
};

export default MapComponent;
