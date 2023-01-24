import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

export default function Navbar() {
  return (
    <AppBar position="static" variant="outlined" elevation={0}>
      <Toolbar
        variant="dense"
        sx={{ bgcolor: "#f3dabc", color: "rgb(100,100,100)" }}
      >
        <Head>
          <title key="title">Seed Planting Robot</title>
        </Head>

        <Image src="/logo.png" alt="" width={100} height={100} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Seed <br />
          Planting <br />
          Robot
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
