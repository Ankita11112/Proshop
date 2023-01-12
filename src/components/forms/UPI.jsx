import { Button, Stack, TextField } from "@mui/material";
import React from "react";

const UPI = () => {
  return (
    <Stack
      sx={{ width: "100%", margin: "3rem 0" }}
      justifyContent={"space-around"}
      alignItems="center"
      direction={"row"}
    >
      <label>UPI ID</label>
      <TextField label="" variant="outlined" />
      <Button sx={{ padding: "1rem" }} variant="contained">
        Pay Now
      </Button>
    </Stack>
  );
};

export default UPI;
