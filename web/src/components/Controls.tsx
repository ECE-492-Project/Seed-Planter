import { ControlsContext } from "@/pages";
import { SatelliteAlt, Signpost } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { get } from "lodash";
import { useContext, useState } from "react";

export const SEED_OPTIONS = ["Seed 1", "Seed 2", "Seed 3", "Seed 4"];
export const MAP_TILES = [
  {
    label: "Satellite",
    icon: <SatelliteAlt />,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  {
    label: "Road",
    icon: <Signpost />,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
];

const MAX_SEEDS = 10;
function isValidNumOfSeeds(num: number) {
  return !!num && num >= 1 && num <= MAX_SEEDS;
}

export default function Controls() {
  const { values, setValue } = useContext(ControlsContext);
  const [error, setError] = useState(false);
  const [mapView, setMapView] = useState(MAP_TILES[0]["url"]);

  return (
    <Stack direction="row" spacing={2} ml={14}>
      <FormControl>
        <InputLabel>Seed Type</InputLabel>
        <Select
          value={get(values, "seedType", SEED_OPTIONS[0])}
          label="Seed Type"
          onChange={(e: SelectChangeEvent) =>
            setValue("seedType", e.target.value)
          }
          sx={{ width: "200px" }}
        >
          {SEED_OPTIONS.map((seed, i) => (
            <MenuItem key={i} value={seed}>
              {seed}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        type="number"
        label="Num of Seeds"
        defaultValue={1}
        InputProps={{ inputProps: { min: 1, max: MAX_SEEDS, step: 1 } }}
        error={error}
        helperText={error ? `Must be between 1 and ${MAX_SEEDS}` : ""}
        onChange={(e) => {
          if (isValidNumOfSeeds(e.target.value as any)) {
            setValue("numOfSeeds", e.target.value);
            setError(false);
          } else setError(true);
        }}
        sx={{ width: "200px" }}
      />

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        marginLeft="55px !important"
      >
        <InputLabel sx={{ fontSize: "12px" }}>
          Map
          <br />
          View
        </InputLabel>
        <ToggleButtonGroup
          value={mapView}
          exclusive
          onChange={(e, newValue) => {
            if (!!newValue) {
              setValue("mapTile", newValue);
              setMapView(newValue as any);
            }
          }}
        >
          {MAP_TILES.map((tile, i) => (
            <ToggleButton value={tile["url"]} key={i}>
              {tile["icon"]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
}
