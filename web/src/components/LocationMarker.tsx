import { useEffect, useState } from "react";
import { Circle, LayerGroup, useMap } from "react-leaflet";

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
    <LayerGroup>
      <Circle
        center={position}
        pathOptions={{ fillColor: "#3488ff", fillOpacity: 1 }}
        radius={50}
        stroke={false}
      />
      <Circle
        center={position}
        pathOptions={{ fillColor: "blue" }}
        radius={100}
      />
    </LayerGroup>
  );
}
