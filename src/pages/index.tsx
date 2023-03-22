import { MAP_TILES, SEED_OPTIONS } from "@/components/Controls";
import { Coordinate } from "@/components/Coordinates";
import Navbar from "@/components/Navbar";
import { Box, LinearProgress } from "@mui/material";
import { LatLngLiteral } from "leaflet";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

export const DEFAULT_CENTER: LatLngLiteral = { lat: 53.527, lng: -113.53 };

export interface Props {
  seed: string;
  setSeed: (seed: string) => void;
  numSeeds: number;
  setNumSeeds: (numSeeds: number) => void;
  mapTile: string;
  setMapTile: (mapTile: string) => void;
  coords: Coordinate[];
  setCoords: (coords: Coordinate[]) => void;
  myPosition: LatLngLiteral;
  setMyPosition: (myPosition: LatLngLiteral) => void;
  path: LatLngLiteral[];
  setPath: (path: LatLngLiteral[]) => void;
}

export default function Home() {
  const [seed, setSeed] = useState(SEED_OPTIONS[0]);
  const [numSeeds, setNumSeeds] = useState(1);
  const [mapTile, setMapTile] = useState(MAP_TILES["Satellite"]["url"]);
  const [coords, setCoords] = useState<Coordinate[]>([]);
  const [myPosition, setMyPosition] = useState(DEFAULT_CENTER);
  const [path, setPath] = useState<LatLngLiteral[]>([]);

  // https://stackoverflow.com/a/64634759
  const Map = useMemo(
    () =>
      dynamic<Props>(() => import("@/components/Map" as string), {
        loading: () => <LinearProgress />,
        ssr: false,
      }),
    []
  );

  const props = {
    seed,
    setSeed,
    numSeeds,
    setNumSeeds,
    mapTile,
    setMapTile,
    coords,
    setCoords,
    myPosition,
    setMyPosition,
    path,
    setPath,
  };

  return (
    <Box>
      <Navbar {...props} />
      <Map {...props} />
    </Box>
  );
}
