import { ControlsContext } from "@/pages";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { get } from "lodash";
import { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MAP_TILES } from "./Controls";
import { Legend } from "./Legend";
import LocationMarker from "./LocationMarker";
import Coordinates from "./Coordinates";
import { NAV_HEIGHT } from "./Navbar";

export const DEFAULT_CENTER: LatLngExpression = [53.527, -113.53];

export default function Map() {
  const { values } = useContext(ControlsContext);

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={15}
      preferCanvas
      style={{
        height: `calc(100vh - ${NAV_HEIGHT})`,
        width: "100%",
        cursor: "crosshair",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={get(values, "mapTile", MAP_TILES[0]["url"])}
      />
      <LocationMarker />

      <Coordinates />
      <Legend />
    </MapContainer>
  );
}
