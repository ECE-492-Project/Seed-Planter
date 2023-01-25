import { PlayCircleOutline } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import Controls from "./Controls";

export const NAV_HEIGHT = "100px";
const NAV_BGCOLOR = "#f3dabc";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      variant="outlined"
      elevation={0}
      sx={{ bgcolor: NAV_BGCOLOR }}
    >
      <Toolbar
        variant="dense"
        sx={{ bgcolor: NAV_BGCOLOR, color: "rgb(100,100,100)" }}
      >
        <Head>
          <title key="title">Seed Planting Robot</title>
        </Head>

        <Image src="/logo.png" alt="" width={100} height={100} />
        <Typography
          variant="h5"
          component="span"
          sx={{ lineHeight: 1, fontWeight: 500, letterSpacing: 1, ml: 1 }}
        >
          <strong>S</strong>eed <br />
          <strong>P</strong>lanting <br />
          <strong>R</strong>obot
        </Typography>

        <Controls />

        <Button
          variant="contained"
          startIcon={<PlayCircleOutline />}
          sx={{ ml: "auto" }}
        >
          Start Planting
        </Button>
      </Toolbar>
    </AppBar>
  );
}
