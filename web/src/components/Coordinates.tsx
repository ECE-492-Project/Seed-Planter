import { ControlsContext } from "@/pages";
import { LatLng } from "leaflet";
import { useContext, useState } from "react";
import {
  LayerGroup,
  LayersControl,
  Marker,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { SEED_OPTIONS } from "./Controls";

export interface Coordinate {
  seed: string;
  numSeeds: number;
  latlng: LatLng;
}
export default function Coordinates() {
  const { values } = useContext(ControlsContext);
  const [coords, setCoords] = useState<Coordinate[]>([]);

  const map = useMapEvents({
    click({ latlng }) {
      console.log("Adding coordinate: ", latlng);
      const newCoord = {
        latlng,
        seed: values.seed,
        numSeeds: values.numSeeds,
      };
      setCoords([...coords, newCoord]);
    },
  });

  console.log("GERE:", coords);

  return (
    <LayersControl position="topright">
      {SEED_OPTIONS.map((seed, i) => (
        <LayersControl.Overlay checked name={seed} key={i}>
          <LayerGroup>
            {coords
              .filter((coord: Coordinate) => coord.seed === seed)
              .map((coord: Coordinate, j) => (
                <Marker position={coord.latlng} draggable key={j}>
                  <Tooltip>
                    {seed} &#40;{coord.numSeeds}&#41;
                  </Tooltip>
                </Marker>
              ))}
          </LayerGroup>
        </LayersControl.Overlay>
      ))}
    </LayersControl>
  );
}
