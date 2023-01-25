import Navbar from "@/components/Navbar";
import { Box, LinearProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { createContext, useContext, useMemo, useState } from "react";

export const ControlsContext = createContext<{
  values: any;
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
    <ControlsContext.Provider value={{ values, setValues, setValue }}>
      <Box>
        <Navbar />
        <Map />
      </Box>
    </ControlsContext.Provider>
  );
}
