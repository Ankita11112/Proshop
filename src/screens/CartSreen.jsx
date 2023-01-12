import {
  Alert,
  Button,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import Loading from "../components/Loading";
import { createUserCart, fetchCartItems } from "../slices/CartSlice";

const CartSreen = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { items, loading, amount, subQty } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    userInfo && dispatch(fetchCartItems(userInfo._id));
  }, [userInfo]);
  return (
    <Stack>
      {loading && <Loading /> && !userInfo ? (
        <Alert severity="info">
          You are not logged In, please{" "}
          <Link
            sx={{ cursor: "pointer" }}
            underline="always"
            onClick={() => navigate("/login")}
          >
            login here
          </Link>
        </Alert>
      ) : items?.length === 0 ? (
        <Alert severity="info">
          {" "}
          Your cart is Empty, continue shopping{" "}
          <Link
            sx={{ cursor: "pointer" }}
            underline="always"
            onClick={() => navigate("/")}
          >
            here
          </Link>{" "}
        </Alert>
      ) : (
        <Grid container>
          <Grid item md={7}>
            <List>
              {items?.map((item) => (
                <CartItem item={item} key={item._id} />
              ))}
            </List>
          </Grid>
          <Grid item md={4} sx={{ padding: 4 }}>
            <Paper sx={{ padding: 2 }} elevation={3}>
              <List>
                <ListItem>
                  <Typography variant="h5">
                    Subtotal ({subQty}) items
                    <br /> Amount: $ {Math.ceil(amount).toFixed(2)}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <Button
                    sx={{ padding: "1rem 0", mt: 2 }}
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to checkout
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default CartSreen;
