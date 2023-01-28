import { useEffect, useState } from "react";
import { Circle, LayerGroup, Marker, Tooltip, useMap } from "react-leaflet";

export default function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    console.log("Locating current position...");
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng as any);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, []);

  if (!position) return null;
  return (
    <Marker position={position}>
      <Tooltip>My current location</Tooltip>
    </Marker>
  );
}
