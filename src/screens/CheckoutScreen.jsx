import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { Form, useFormik } from "formik";
import React from "react";
import { useState } from "react";
import Address from "../components/forms/Address";
import Payemnt from "../components/forms/Payemnt";
import PersonalInfo from "../components/forms/PersonalInfo";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../slices/CartSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutScreen = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { items, amount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    phone_no: 0,
    alt_phone_no: 0,
    house_no: "",
    street_name: "",
    city: "",
    state: "",
    country: "",
    pincode: 0,
    paymentType: "cod",
    card_type: "mastercard",
    holder_name: "",
    cardNumber: "",
    cvc: "",
    expiryDate: "",
  };
  const { handleChange, values, errors, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      let {
        fname,
        lname,
        email,
        phone_no,
        alt_phone_no,
        house_no,
        street_name,
        city,
        state,
        pincode,
        country,
        paymentType,
      } = values;
      let data = {
        user: {
          _id: userInfo._id,
          fname,
          lname,
          email,
          phone: phone_no,
          alt_phone: alt_phone_no,
        },
        orderItems: [
          ...items.map((item) => {
            return {
              name: item.name,
              qty: item.qty,
              price: item.price,
              image: item.image,
              _id: item._id,
            };
          }),
        ],
        shippingAddress: {
          house_no: parseInt(house_no),
          street: street_name,
          city,
          state,
          country,
          pincode,
        },
        paymentMethod: paymentType,
        shippingPrice: amount > 1000 ? 100 : 10,
        totalPrice: amount + amount > 1000 ? amount + 100 : amount + 10,
        isPaid: paymentType === "cod" ? false : true,
      };
      axios
        .post(`${import.meta.env.VITE_APP_URL}/api/orders`, data)
        .then((res) => {
          Swal.fire("Your Order is Placed!!", "success");
          dispatch(clearCart(userInfo._id));
          navigate("/");
        })
        .catch((err) => console.log("err:", err));
    },
  });
  const [steps, setSteps] = useState([
    { label: "Personal Info", completed: false },
    { label: "Address", completed: false },
    { label: "Payment", completed: false },
  ]);

  const [count, setCount] = useState(0);

  const forms = [
    <PersonalInfo handleChange={handleChange} values={values} />,
    <Address handleChange={handleChange} values={values} />,
    <Payemnt handleChange={handleChange} values={values} />,
  ];

  // for the Snackbar
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // next form
  const nextForm = () => {
    let {
      fname,
      lname,
      email,
      phone_no,
      house_no,
      street_name,
      city,
      state,
      pincode,
      country,
    } = values;
    if (
      count == 0 &&
      fname != "" &&
      lname != "" &&
      email.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      ) &&
      phone_no != 0
    ) {
      let newStep = steps;
      newStep[count].completed = true;
      setSteps([...newStep]);
      count < 2 && setCount(count + 1);
    } else if (
      count == 1 &&
      house_no != "" &&
      street_name != "" &&
      city != "" &&
      state != "" &&
      country != "" &&
      pincode != 0
    ) {
      let newStep = steps;
      newStep[count].completed = true;
      setSteps([...newStep]);
      count < 2 && setCount(count + 1);
    } else {
      handleClick();
    }
  };

  //back form
  const backForm = () => {
    count > 0 && setCount(count - 1);
    let newStep = steps;
    newStep[count].completed = false;
    setSteps([...newStep]);
  };
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Box sx={{ width: { xs: "90%", md: "50%" } }}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Paper
            elevation={4}
            sx={{
              width: "100%",
              height: "fit-content",
              padding: { xs: 2, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Stepper activeStep={count}>
              {steps.map((step, index) => (
                <Step key={index} completed={step.completed}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Snackbar
              sx={{ mt: 14 }}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                All fields are mandatory!!!
              </Alert>
            </Snackbar>
            {forms[count]}
            <Box sx={{ height: 50, position: "relative" }}>
              {count != 0 && (
                <Button
                  sx={{ position: "absolute", left: 0 }}
                  variant="outlined"
                  onClick={backForm}
                >
                  Back
                </Button>
              )}
              {count === 2 ? (
                <Button
                  sx={{ position: "absolute", right: 0, top: 0 }}
                  variant="contained"
                  type={"button"}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  sx={{ position: "absolute", right: 0, top: 0 }}
                  variant="contained"
                  type={"button"}
                  onClick={nextForm}
                >
                  {"Next"}
                </Button>
              )}
            </Box>
          </Paper>
        </form>
      </Box>
    </Stack>
  );
};

export default CheckoutScreen;
