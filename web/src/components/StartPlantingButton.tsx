import { Props } from "@/pages";
import { PlayCircleOutline } from "@mui/icons-material";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { computePath } from "./geo";

const handleCharacteristicValueChanged = (event: any) => {
  console.log(event.target.value.getUint8(0) + "%");
};
const onDisconnected = (event: any) => {
  const device = event.target;
  alert(`Device ${device.name} is disconnected.`);
};

/**
 * Web Bluetooth API: https://developer.chrome.com/articles/bluetooth/
 * https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth/requestDevice
 * Tutorial: https://rebeccamdeprey.com/blog/interact-with-bluetooth-devices-using-the-web-bluetooth-api
 */
const connectToRobot = async () => {
  try {
    const device = await (navigator as any).bluetooth.requestDevice({
      // filters: [{ name: "raspberrypi" }], // filter by device name
      acceptAllDevices: true, // accept all devices
      // optionalServices: ["battery_service"], // Required to access service later.
      // filters: [{ services: ["battery_service"] }],
    });

    // On disconnect events
    device.addEventListener("gattserverdisconnected", onDisconnected);
    window.onbeforeunload = function () {
      // On page leave, disconnect
      device.gatt.disconnect();
    };

    console.log("Device:", device);
    const server = await device.gatt.connect();
    console.log("Server:", server);
    const service = await server.getPrimaryService("battery_service");
    console.log("Service:", service);
    const characteristic = await service.getCharacteristic("battery_level");
    console.log("Characteristic:", characteristic);

    // Reading the value
    const reading = await characteristic.readValue();
    console.log(reading.getUint8(0) + "%");

    // Notification
    characteristic.startNotifications();
    characteristic.addEventListener(
      "characteristicvaluechanged",
      handleCharacteristicValueChanged
    );

    // Writing value
    const resetEnergyExpended = Uint8Array.of(1);
    return characteristic.writeValue(resetEnergyExpended);
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
