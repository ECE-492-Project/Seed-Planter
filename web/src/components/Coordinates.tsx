import { Props } from "@/pages";
import { styled } from "@mui/material";
import { LatLng, LeafletMouseEvent } from "leaflet";
import { useState } from "react";
import {
  CircleMarker,
  LayerGroup,
  LayersControl,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { SEED_OPTIONS, SEED_TO_COLORS } from "./Controls";

const SeedMarker = styled(CircleMarker)(({ theme }) => ({
  // cursor: "no-drop !important",
}));
export interface Coordinate {
  seed: string;
  numSeeds: number;
  latlng: LatLng;
}
export default function Coordinates({ seed, numSeeds }: Props) {
  const [coords, setCoords] = useState<Coordinate[]>([]);

  const map = useMapEvents({
    click({ latlng }) {
      // Add coordinate on map click
      console.log("Adding coordinate: ", latlng);
      const newCoord = {
        latlng,
        seed: seed,
        numSeeds: numSeeds,
      };
      setCoords([...coords, newCoord]);
    },
  });
  const deleteCoord = (e: LeafletMouseEvent) => {
    console.log("Deleting coordinate: ", e.latlng);
    setCoords(coords.filter((c) => c.latlng !== e.latlng));
  };

  return (
    <LayersControl position="topright">
      {SEED_OPTIONS.map((seed, i) => (
        <LayersControl.Overlay checked name={seed} key={i}>
          <LayerGroup>
            {coords
              .filter((coord: Coordinate) => coord.seed === seed)
              .map((coord: Coordinate, j) => (
                <SeedMarker
                  center={coord.latlng}
                  key={"seed" + j}
                  radius={10}
                  color={SEED_TO_COLORS[seed]}
                  eventHandlers={{ click: deleteCoord }}
                  bubblingMouseEvents={false} // prevent map click
                >
                  <Tooltip>
                    {seed} &#40;x{coord.numSeeds}&#41;
                    <br />
                    <em>Click to delete</em>
                  </Tooltip>
                </SeedMarker>
              ))}
          </LayerGroup>
        </LayersControl.Overlay>
      ))}
    </LayersControl>
  );
}
