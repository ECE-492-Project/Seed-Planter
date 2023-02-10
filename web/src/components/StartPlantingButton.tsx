import { Props } from "@/pages";
import { PlayCircleOutline } from "@mui/icons-material";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { computePath } from "./geo";

/**
 * Web Bluetooth API: https://developer.chrome.com/articles/bluetooth/
 * https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice
 */
const connectToRobot = async () => {
  try {
    const device = await (navigator as any).bluetooth.requestDevice({
      // filters: [{ name: "raspberrypi" }], // filter by device name
      acceptAllDevices: true, // accept all devices
      optionalServices: ["battery_service"], // Required to access service later.
    });
    console.log("DEVICE:", device);
  } catch (e) {
    console.error(e);
  }
};
/**
 * Transmit data to the robot
 */
const transmitData = (data: any) => {
  console.log("Transmitting data:", data);
  connectToRobot();
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
