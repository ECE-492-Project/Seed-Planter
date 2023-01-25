import { SEED_OPTIONS } from "@/components/Controls";
import Navbar from "@/components/Navbar";
import { Box, LinearProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { createContext, useMemo, useState } from "react";

export const ControlsContext = createContext<{
  values: { seed: string; numSeeds: number };
  setValues: any;
  setValue: any;
}>({} as any);

export default function Home() {
  const [values, setValues] = useState({});

  // https://stackoverflow.com/a/64634759
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map" as string), {
        loading: () => <LinearProgress />,
        ssr: false,
      }),
    []
  );

  const setValue = (field: string, value: any) =>
    setValues({ ...values, [field]: value });

  return (
    <ControlsContext.Provider
      value={{
        values: {
          seed: SEED_OPTIONS[0],
          numSeeds: 1,
        },
        setValues,
        setValue,
      }}
    >
      <Box>
        <Navbar />
        <Map />
      </Box>
    </ControlsContext.Provider>
  );
}
