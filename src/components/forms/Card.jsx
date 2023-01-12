import { Box, MenuItem, Select, Stack, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import mastercard from "../../assets/mastercard.png";
import visa from "../../assets/visa.png";
import rupay from "../../assets/rupay.png";
// import images from "react-payment-inputs/images";

const Card = ({ handleChange, values }) => {
  const { getCardNumberProps, getCVCProps, getExpiryDateProps } =
    usePaymentInputs();
  return (
    <Stack sx={{ padding: "3rem 0" }} spacing={3}>
      <Box>
        <label>Card Type: </label>
        <Select
          value={values.card_type}
          onChange={handleChange}
          name="card_type"
        >
          <MenuItem value="mastercard">MasterCard</MenuItem>
          <MenuItem value="visa">Visa</MenuItem>
          <MenuItem value="rupay">RuPay</MenuItem>
        </Select>
      </Box>
      <Box>
        <label>Card holder Name : </label>
        <TextField
          value={values.holder_name}
          onChange={handleChange}
          name="holder_name"
          variant="standard"
          placeholder="Card holder's name"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <label>Card Number : </label>
        <TextField
          value={values.cardNumber}
          name="cardNumber"
          inputProps={getCardNumberProps({ onChange: handleChange })}
          variant="standard"
        />
        <img
          style={{ height: 40, marginLeft: 5 }}
          src={
            values.card_type === "mastercard"
              ? mastercard
              : values.card_type === "visa"
              ? visa
              : rupay
          }
          alt=""
        />
      </Box>
      <Box>
        <label>CVV : </label>
        <TextField
          value={values.cvc}
          name="cvc"
          inputProps={getCVCProps({ onChange: handleChange })}
          variant="standard"
        />
      </Box>
      <Box>
        <label>Expiry Date : </label>
        <TextField
          value={values.expiryDate}
          name="expiryDate"
          inputProps={getExpiryDateProps({ onChange: handleChange })}
          variant="standard"
        />
      </Box>
    </Stack>
  );
};

export default Card;
