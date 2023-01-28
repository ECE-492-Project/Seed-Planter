import { MAP_TILES, SEED_OPTIONS } from "@/components/Controls";
import Navbar from "@/components/Navbar";
import { Box, LinearProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

export interface Props {
  seed: string;
  setSeed: (seed: string) => void;
  numSeeds: number;
  setNumSeeds: (numSeeds: number) => void;
  mapTile: string;
  setMapTile: (mapTile: string) => void;
}

export default function Home() {
  const [seed, setSeed] = useState(SEED_OPTIONS[0]);
  const [numSeeds, setNumSeeds] = useState(1);
  const [mapTile, setMapTile] = useState(MAP_TILES["Satellite"]["url"]);

  // https://stackoverflow.com/a/64634759
  const Map = useMemo(
    () =>
      dynamic<Props>(() => import("@/components/Map" as string), {
        loading: () => <LinearProgress />,
        ssr: false,
      }),
    []
  );

  return (
    <Box>
      <Navbar
        seed={seed}
        setSeed={setSeed}
        numSeeds={numSeeds}
        setNumSeeds={setNumSeeds}
        mapTile={mapTile}
        setMapTile={setMapTile}
      />
      <Map
        seed={seed}
        setSeed={setSeed}
        numSeeds={numSeeds}
        setNumSeeds={setNumSeeds}
        mapTile={mapTile}
        setMapTile={setMapTile}
      />
    </Box>
  );
}
