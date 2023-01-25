import { styled } from "@mui/material";
import { SEED_COLORS, SEED_OPTIONS } from "./Controls";

const Root = styled("div")(({ theme }) => ({
  padding: "6px 8px",
  background: "rgba(255, 255, 255, 0.9)",
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
  borderRadius: "5px",
  margin: "10px",
  color: "#777",
}));
const ColorBox = styled("div")(({ theme, color }) => ({
  width: "18px",
  height: "18px",
  marginRight: "8px",
  background: color,
}));
const ColorCode = styled("div")(({ theme, color }) => ({
  display: "flex",
  marginTop: "5px",
  marginBottom: "5px",
}));

export function Legend() {
  return (
    <Root className="leaflet-bottom leaflet-left">
      {SEED_OPTIONS.map((seed, i) => (
        <ColorCode key={i}>
          <ColorBox color={SEED_COLORS[i]} />
          {seed}
        </ColorCode>
      ))}
    </Root>
  );
}
