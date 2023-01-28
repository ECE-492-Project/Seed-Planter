import { Props } from "@/pages";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Coordinates from "./Coordinates";
import { Legend } from "./Legend";
import LocationMarker from "./LocationMarker";
import { NAV_HEIGHT } from "./Navbar";

export const DEFAULT_CENTER: LatLngExpression = [53.527, -113.53];

export default function Map(props: Props) {
  const { mapTile } = props;

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
        url={mapTile}
      />
      <LocationMarker />

      <Coordinates {...props} />
      <Legend />
    </MapContainer>
  );
}
