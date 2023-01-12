import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  MenuItem,
  Paper,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { addCartItem } from "../slices/CartSlice";
import { createReview, fetchSingleProduct } from "../slices/SingleProduct";

const SingleProductScreen = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [qty, setQty] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleProduct(_id));
  }, []);

  const handleCart = () => {
    if (!userInfo) {
      navigate("/cart");
      return;
    }

    let item = {
      _id: product._id,
      name: product.name,
      image: product.image,
      qty,
      price: product.price,
    };
    dispatch(addCartItem({ user: userInfo._id, cartItem: { product: item } }));
    setTimeout(() => {
      navigate("/cart");
    }, 400);
  };

  const handleComment = () => {
    const data = {
      user: userInfo?._id,
      name: userInfo?.name,
      rating,
      comment,
    };
    dispatch(createReview({ id: product._id, data }));
    setRating(0);
    setComment("");
  };
  return (
    <Stack spacing={2}>
      <Button
        sx={{ width: "fit-content", padding: "1rem 1rem" }}
        variant="outlined"
        onClick={() => navigate("/")}
      >
        Go back
      </Button>
      {loading && <Loading />}
      {error && <Alert severity="error">{error}</Alert>}
      {product && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <img
              style={{ width: "100%" }}
              src={product.image}
              alt={product.name}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <List>
              <ListItem>
                <Typography variant="h4">{product.name}</Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography>
                  <Rating value={product.ratings} precision={0.5} readOnly />{" "}
                  {`${product.numReviews} reviews`}
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography variant="body1">{product?.description}</Typography>
              </ListItem>
              <Divider />
              {userInfo && (
                <>
                  <ListItem>
                    <Box sx={{ mt: 1 }}>
                      <Rating
                        value={rating}
                        precision={0.5}
                        onChange={(e, v) => setRating(v)}
                      />
                      <Stack direction={"row"}>
                        <TextField
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          size="small"
                        />
                        <Button
                          sx={{ mt: 0.5, ml: 1 }}
                          size="small"
                          variant="contained"
                          onClick={handleComment}
                        >
                          POST
                        </Button>
                      </Stack>
                    </Box>
                  </ListItem>
                </>
              )}
              {product.reviews.length != 0 && (
                <>
                  <Typography variant="h6">Comments</Typography>
                  <Divider />
                </>
              )}
              {product?.reviews.map(
                (review, index) =>
                  review.comment !== "" && (
                    <ListItem key={index}>
                      <Box>
                        <Stack direction={"row"} gap={1}>
                          <Typography variant="body2">{review.name}</Typography>
                          <Rating
                            size="small"
                            value={review.rating}
                            precision={0.5}
                            readOnly
                          />
                        </Stack>
                        <Typography variant="body1">
                          {review.comment}
                        </Typography>
                      </Box>
                    </ListItem>
                  )
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={2.8}>
            <Paper elevation={4} sx={{ padding: 2 }}>
              <List>
                <ListItem>
                  <Typography variant="h5">Price: $ {product.price}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography sx={{ fontSize: "1.2rem" }} variant="subtitle1">
                    Status:{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                </ListItem>
                <Divider />
                {product.countInStock > 0 && (
                  <ListItem>
                    Qty:{" "}
                    <Select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((i) => (
                        <MenuItem key={i} value={i + 1}>
                          {i + 1}
                        </MenuItem>
                      ))}
                    </Select>
                  </ListItem>
                )}
                <Divider />
                <ListItem>
                  <Button
                    sx={{ padding: "1rem 0", mt: 2 }}
                    disabled={product.countInStock === 0}
                    onClick={handleCart}
                    fullWidth
                    variant="contained"
                  >
                    Add to Cart
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

export default SingleProductScreen;
