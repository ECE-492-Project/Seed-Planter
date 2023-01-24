import Navbar from "@/components/Navbar";
import { Box, LinearProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  // https://stackoverflow.com/a/64634759
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map" as string), {
        loading: () => <LinearProgress />,
        ssr: false,
      }),
    []
  );

  return (
    <Box>
      <Navbar />
      <Map />
    </Box>
  );
}
