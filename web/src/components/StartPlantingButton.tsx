import { Props } from "@/pages";
import { PlayCircleOutline } from "@mui/icons-material";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { computePath } from "./geo";

/**
 * Transmit data to the robot
 */
const transmitData = (data: any) => {
  console.log("Transmitting data:", data);
};

export const handleSubmit =
  ({
    setLoading,
    coords,
    myPosition,
    setPath,
  }: Props & { setLoading: (loading: boolean) => void }) =>
  (e: any) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    console.log("Coords received:", coords);

    const pathCoords = computePath(myPosition, coords);
    console.log("Computed path:", pathCoords);

    // Draw path on map
    setPath(pathCoords);

    transmitData({});

    setLoading(false);
  };

export default function StartPlantingButton({
  loading,
  ...rest
}: { loading: boolean } & ButtonProps) {
  return (
    <Button
      variant="contained"
      startIcon={
        loading ? <CircularProgress size={20} /> : <PlayCircleOutline />
      }
      sx={{ ml: "auto" }}
      type="submit"
      {...rest}
    >
      Start Planting
    </Button>
  );
}
