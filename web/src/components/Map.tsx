import { ControlsContext } from "@/pages";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { get } from "lodash";
import { useContext } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MAP_TILES } from "./Controls";
import LocationMarker from "./LocationMarker";
import MapTypeController from "./MapTypeController";
import { NAV_HEIGHT } from "./Navbar";

export const DEFAULT_CENTER: LatLngExpression = [53.527, -113.53];

export default function Map() {
  const { values } = useContext(ControlsContext);

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={13}
      preferCanvas
      style={{ height: `calc(100vh - ${NAV_HEIGHT})`, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={get(values, "mapTile", MAP_TILES[0]["url"])}
      />
      <LocationMarker />
      {/* <Marker position={[51.51, -0.09]} draggable>
        <Popup>Popup for Marker</Popup>
        <Tooltip>Tooltip for Marker</Tooltip>
      </Marker> */}
      <MapTypeController />
    </MapContainer>
  );
}
