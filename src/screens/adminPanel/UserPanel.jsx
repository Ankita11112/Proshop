import {
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchAllUser, updateAdmin } from "../../slices/UserSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const UserPanel = () => {
  const { userInfo, users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    !userInfo && navigate("/");
    !userInfo?.isAdmin ? navigate("/") : dispatch(fetchAllUser());
  }, []);

  const handleChange = (e, user) => {
    if (userInfo._id === user._id) {
      alert("you can't change role");
      return;
    }
    const check = confirm(
      `are you sure that you want to ${user.isAdmin ? "remove" : "make"} ${
        user.name
      } as an admin?`
    );
    check &&
      dispatch(
        updateAdmin({ id: user._id, data: { isAdmin: e.target.checked } })
      );
  };

  const handleDelete = (user) => {
    let check = userInfo._id === user._id;
    check && alert("you can't delete yourself");
    !check && dispatch(deleteUser(user._id));
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align={"center"}>Name</TableCell>
              <TableCell align={"center"}>email</TableCell>
              <TableCell align={"center"}>Admin</TableCell>
              <TableCell align={"center"}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell align={"center"}>{user.name}</TableCell>
                <TableCell align={"center"}>{user.email}</TableCell>
                <TableCell align={"center"}>
                  {user.isAdmin ? (
                    <CheckIcon sx={{ color: "green" }} />
                  ) : (
                    <CloseIcon sx={{ color: "red" }} />
                  )}
                  <Switch
                    checked={user.isAdmin}
                    color="green"
                    onClick={(e) => handleChange(e, user)}
                  />
                </TableCell>
                <TableCell align={"center"}>
                  <DeleteIcon
                    onClick={() => handleDelete(user)}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserPanel;
