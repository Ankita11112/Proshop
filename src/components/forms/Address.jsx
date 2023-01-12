import { Box, Stack, TextField } from "@mui/material";
import React from "react";

const Address = ({ handleChange, values }) => {
  return (
    <Stack
      alignSelf={"center"}
      sx={{ width: "70%", margin: "3rem 0" }}
      spacing={4}
    >
      <Box>
        <TextField
          required
          value={values.house_no}
          onChange={handleChange}
          name="house_no"
          variant="standard"
          fullWidth
          label="House No"
        />
      </Box>
      <Box>
        <TextField
          required
          value={values.street_name}
          onChange={handleChange}
          name="street_name"
          variant="standard"
          fullWidth
          label="Street Name"
        />
      </Box>
      <Box>
        <TextField
          value={values.city}
          onChange={handleChange}
          name="city"
          variant="standard"
          fullWidth
          label="City"
        />
      </Box>
      <Box>
        <TextField
          required
          value={values.state}
          onChange={handleChange}
          name="state"
          variant="standard"
          fullWidth
          label="State"
        />
      </Box>
      <Box>
        <TextField
          required
          value={values.country}
          onChange={handleChange}
          name="country"
          variant="standard"
          fullWidth
          label="Country"
        />
      </Box>
      <Box>
        <TextField
          required
          value={values.pincode}
          onChange={handleChange}
          name="pincode"
          type={"number"}
          variant="standard"
          fullWidth
          label="Pincode"
        />
      </Box>
    </Stack>
  );
};

export default Address;
