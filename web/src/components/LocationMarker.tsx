import { Props } from "@/pages";
import { useEffect } from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";

export default function LocationMarker({ myPosition, setMyPosition }: Props) {
  const map = useMap();

  useEffect(() => {
    console.log("Locating current position...");
    map.locate().on("locationfound", function (e) {
      setMyPosition(e.latlng as any);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, []);

  if (!myPosition) return null;
  return (
    <Marker position={myPosition}>
      <Tooltip>My current location</Tooltip>
    </Marker>
  );
}
