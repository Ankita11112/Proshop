import {
  Box,
  Divider,
  Grid,
  Link,
  ListItem,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateItemQty } from "../slices/CartSlice";

const CartItem = ({ item }) => {
  const { _id, name, image, qty } = item;
  const { userInfo } = useSelector((state) => state.user);
  const { all_products } = useSelector((state) => state.products);
  const product = all_products?.find((v) => v._id === _id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemove = () => {
    let data = {
      user: userInfo._id,
      _id,
    };
    dispatch(removeCartItem(data));
  };

  const handleQty = (value) => {
    let data = {
      user: userInfo._id,
      item: {
        _id,
        qty: parseInt(value),
      },
    };
    dispatch(updateItemQty(data));
  };
  return (
    <>
      <ListItem>
        <Grid container>
          <Grid item xs={2}>
            <Stack
              sx={{ height: "100%" }}
              justifyContent={"center"}
              alignItems="center"
            >
              <img
                style={{ width: "95%", borderRadius: 6 }}
                src={image}
                alt={name}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack
              sx={{ height: "100%" }}
              justifyContent={"center"}
              alignItems="center"
            >
              <Link
                sx={{ cursor: "pointer" }}
                underline="hover"
                onClick={() => navigate(`/product/${_id}`)}
              >
                <Typography
                  sx={{ fontSize: "1.2rem" }}
                  variant="h6"
                  textAlign={"center"}
                >
                  {name}
                </Typography>
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{ height: "100%" }}
              justifyContent={"center"}
              alignItems="center"
            >
              Qty:{" "}
              <Select value={qty} onChange={(e) => handleQty(e.target.value)}>
                {[...Array(product?.countInStock).keys()].map((i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              sx={{ height: "100%" }}
              justifyContent={"center"}
              alignItems="center"
            >
              <Box sx={{ cursor: "pointer " }} onClick={handleRemove}>
                <DeleteIcon />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </>
  );
};

export default CartItem;
