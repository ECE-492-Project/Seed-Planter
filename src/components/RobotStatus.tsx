import { Card } from "@mui/material";
import BatteryGauge from "react-battery-gauge";

export interface Status {
  batteryLevel: number;
}

interface Props {
  status: Status;
}
/**
 * Battery Gauge docs: https://github.com/Umerbhat/react-battery-gauge
 */
export default function RobotStatus({ status: { batteryLevel } }: Props) {
  return (
    <Card
      sx={{
        pt: 1,
        pb: 0.5,
        px: 2,
        position: "absolute",
        bottom: "-50px",
        left: "50%", // center left
        transform: "translateX(-50%)", // center of div
        zIndex: 1000,
      }}
      elevation={10}
    >
      <BatteryGauge value={batteryLevel} size={80} animated charging={false} />
    </Card>
  );
}
