import { Props } from "@/pages";
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
  Tooltip,
} from "@mui/material";
import { useState } from "react";

// ADD SEEDS HERE

export const SEED_OPTIONS = ["Seed 1", "Seed 2", "Seed 3", "Seed 4"];
export const SEED_COLORS = ["red", "green", "blue", "orange"];

export const SEED_TO_COLORS = {} as { [key: string]: string };
for (let i = 0; i < SEED_OPTIONS.length; i++)
  SEED_TO_COLORS[SEED_OPTIONS[i]] = SEED_COLORS[i];

export const MAP_TILES = {
  Satellite: {
    icon: <SatelliteAlt />,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },
  Road: {
    icon: <Signpost />,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
};

const MAX_SEEDS = 10;
function isValidNumOfSeeds(num: number) {
  return !!num && num >= 1 && num <= MAX_SEEDS;
}

export default function Controls({
  seed,
  setSeed,
  numSeeds,
  setNumSeeds,
  mapTile,
  setMapTile,
}: Props) {
  const [error, setError] = useState(false);

  return (
    <Stack direction="row" spacing={2} mx="auto">
      <FormControl>
        <InputLabel>Seed Type</InputLabel>
        <Select
          value={seed}
          label="Seed Type"
          onChange={(e: SelectChangeEvent) => setSeed(e.target.value)}
          sx={{ width: "200px" }}
          required
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
        defaultValue={numSeeds}
        InputProps={{ inputProps: { min: 1, max: MAX_SEEDS, step: 1 } }}
        error={error}
        helperText={error ? `Must be between 1 and ${MAX_SEEDS}` : ""}
        onChange={(e) => {
          if (isValidNumOfSeeds(e.target.value as any)) {
            setNumSeeds(Number(e.target.value));
            setError(false);
          } else setError(true);
        }}
        sx={{ width: "200px" }}
        required
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
          value={mapTile}
          exclusive
          onChange={(e, newValue) => !!newValue && setMapTile(newValue)}
        >
          {Object.entries(MAP_TILES).map(([key, value], i) => (
            <ToggleButton key={i} value={value["url"]}>
              <Tooltip title={key}>{value["icon"]}</Tooltip>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
}
