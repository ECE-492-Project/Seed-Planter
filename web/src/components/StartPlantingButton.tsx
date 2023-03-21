import { Props } from "@/pages";
import { PlayCircleOutline } from "@mui/icons-material";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { computePath } from "./geo";

const handleCharacteristicValueChanged = (event: any) => {
  console.log("CHANGED:", event.target.value.getUint8(0) + "%");
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
  // IDs defined on raspberry pi
  const SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
  const RX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
  const TX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

  try {
    const device = await (navigator as any).bluetooth.requestDevice({
      filters: [
        {
          name: "SPR",
          id: "TDh83w3Qnb1C+KOkhyvMUw==",
        },
      ], // filter by device name
      // acceptAllDevices: true, // accept all devices
      optionalServices: [SERVICE_UUID], // Required to access service later.
      // filters: [{ services: ["rpi-gatt-server"] }],
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
    const service = await server.getPrimaryService(SERVICE_UUID);
    console.log("Service:", service);
    const rxCharacteristic = await service.getCharacteristic(
      RX_CHARACTERISTIC_UUID
    );
    console.log("rxCharacteristic:", rxCharacteristic);
    const txCharacteristic = await service.getCharacteristic(
      TX_CHARACTERISTIC_UUID
    );
    console.log("txCharacteristic:", txCharacteristic);

    // Reading the value
    const reading = await rxCharacteristic.readValue();
    console.log("READ:", reading.getUint8(0) + "%");

    // Notification on receiver
    rxCharacteristic.startNotifications();
    rxCharacteristic.addEventListener(
      "characteristicvaluechanged",
      handleCharacteristicValueChanged
    );

    return txCharacteristic;
  } catch (e) {
    console.error(e);
    return null;
  }
};
/**
 * Transmit data to the robot
 */
const transmitData = async (data: any) => {
  console.log("Transmitting data:", data);
  const tx = await connectToRobot();
  // Writing value to transmitter
  const resetEnergyExpended = Uint8Array.of(1);
  tx.writeValue(resetEnergyExpended);
};

export const handleSubmit =
  ({
    setLoading,
    coords,
    myPosition,
    setPath,
  }: Props & { setLoading: (loading: boolean) => void }) =>
  async (e: any) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);
    console.log("Coords received:", coords);

    const pathCoords = computePath(myPosition, coords);
    console.log("Computed path:", pathCoords);

    // Draw path on map
    setPath(pathCoords);

    await transmitData(pathCoords);

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
