import { Box, Stack, TextField } from "@mui/material";
import React from "react";

const PersonalInfo = ({ handleChange, values }) => {
  return (
    <Stack
      alignSelf={"center"}
      sx={{ width: "70%", margin: "3rem 0" }}
      spacing={4}
    >
      <Box>
        <TextField
          required
          value={values.fname}
          onChange={handleChange}
          name="fname"
          label="First Name"
          variant="standard"
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          required
          value={values.lname}
          onChange={handleChange}
          name="lname"
          label="Last Name"
          variant="standard"
          fullWidth
        />
      </Box>
      <Box>
        <TextField
          required
          value={values.email}
          onChange={handleChange}
          name="email"
          variant="standard"
          fullWidth
          type={"email"}
          label="Email"
        />
      </Box>
      <Box>
        <TextField
          required
          value={values.phone_no}
          onChange={handleChange}
          name="phone_no"
          variant="standard"
          fullWidth
          type={"number"}
          label="Phone No."
        />
      </Box>
      <Box>
        <TextField
          required
          value={values.alt_phone_no}
          onChange={handleChange}
          name="alt_phone_no"
          variant="standard"
          fullWidth
          type={"number"}
          label="Alt Phone No."
        />
      </Box>
    </Stack>
  );
};

export default PersonalInfo;
