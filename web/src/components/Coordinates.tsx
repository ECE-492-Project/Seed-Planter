import { Props } from "@/pages";
import { LatLng } from "leaflet";
import { useState } from "react";
import {
  LayerGroup,
  LayersControl,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { SEED_OPTIONS } from "./Controls";
// @ts-ignore
import Marker from "react-leaflet-enhanced-marker";
import SeedMarker from "./SeedMarker";

export interface Coordinate {
  seed: string;
  numSeeds: number;
  latlng: LatLng;
}
export default function Coordinates({ seed, numSeeds }: Props) {
  const [coords, setCoords] = useState<Coordinate[]>([]);

  const map = useMapEvents({
    click({ latlng }) {
      console.log("Adding coordinate: ", latlng);
      const newCoord = {
        latlng,
        seed: seed,
        numSeeds: numSeeds,
      };
      setCoords([...coords, newCoord]);
    },
  });

  return (
    <LayersControl position="topright">
      {SEED_OPTIONS.map((seed, i) => (
        <LayersControl.Overlay checked name={seed} key={i}>
          <LayerGroup>
            {coords
              .filter((coord: Coordinate) => coord.seed === seed)
              .map((coord: Coordinate, j) => (
                <Marker
                  icon={<SeedMarker />}
                  position={coord.latlng}
                  key={"seed" + j}
                  draggable
                >
                  <Tooltip>
                    {seed} &#40;x{coord.numSeeds}&#41;
                  </Tooltip>
                </Marker>
              ))}
          </LayerGroup>
        </LayersControl.Overlay>
      ))}
    </LayersControl>
  );
}
