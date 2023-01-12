import {
  Button,
  ButtonGroup,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const OrderPanel = () => {
  const URL = import.meta.env.VITE_APP_URL;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios(`${URL}/api/orders`).then((res) => {
      setOrders(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    let check = confirm("are you sure???");
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    check &&
      axios
        .delete(`${URL}/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data));
  };

  return (
    <Paper elevation={4}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">OrderId</TableCell>
              <TableCell align="center">UserId</TableCell>
              <TableCell align="center">PaymentMethod</TableCell>
              <TableCell align="center">isPaid</TableCell>
              <TableCell align="center">ShippingDate</TableCell>
              <TableCell align="center">TotalPrice</TableCell>
              <TableCell align="center">isDelivered</TableCell>
              <TableCell align="center">DeliveryDate</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell align="center">{order._id}</TableCell>
                <TableCell align="center">{order.user._id}</TableCell>
                <TableCell align="center">{order.paymentMethod}</TableCell>
                <TableCell align="center">
                  {order.isPaid ? (
                    <CheckIcon sx={{ color: "green" }} />
                  ) : (
                    <CloseIcon sx={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell align="center">
                  {order.ShippingDate ? order.ShippingDate : "pending"}
                </TableCell>
                <TableCell align="center">{order.totalPrice}</TableCell>
                <TableCell align="center">
                  {order.isDelivered ? (
                    <CheckIcon sx={{ color: "lightgreen" }} />
                  ) : (
                    <CloseIcon sx={{ color: "red" }} />
                  )}
                </TableCell>
                <TableCell align="center">
                  {order.deliveryDate ? order.deliveryDate : "pending"}
                </TableCell>
                <TableCell align="center">
                  <ButtonGroup size="small">
                    <Button>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDelete(order._id)}>
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default OrderPanel;
