import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Badge, Container, Link, Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/UserSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { clearCart, emptyCart } from "../slices/CartSlice";

const drawerWidth = 240;
// const navItems = ["cart", "Sign In"];

function Navbar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { subQty } = useSelector((state) => state.cart);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyCart());
    handleClose();
    navigate("/");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [anchorElPanel, setAnchorElPanel] = React.useState(null);

  const handlePanel = (event) => {
    setAnchorElPanel(event.currentTarget);
  };

  const handleClosePanel = () => {
    setAnchorElPanel(null);
  };

  const openPanel = Boolean(anchorElPanel);
  const idPanel = open ? "simple-popover" : undefined;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ProShop
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate("/cart")}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary={"Cart"} />
          </ListItemButton>
        </ListItem>
        {userInfo?.isAdmin && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/admin/products")}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={"Product Panel"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/admin/users")}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={"User Panel"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/admin/orders")}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={"Orders Panel"} />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {userInfo ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("/profile")}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={"Profile"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{ textAlign: "center" }}
              >
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate("/login")}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={"Sign In"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleNavigate = (url) => {
    navigate(url);
    handleClosePanel();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar sx={{ padding: 2 }} component="nav">
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              onClick={() => navigate("/")}
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              ProShop
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button onClick={() => navigate("/cart")} sx={{ color: "#fff" }}>
                <Badge
                  badgeContent={subQty}
                  color="grey"
                  sx={{ fontSize: "1.8rem" }}
                >
                  <ShoppingCartIcon sx={{ fontSize: "2rem" }} />
                </Badge>
              </Button>
              {userInfo?.isAdmin && (
                <Button
                  aria-describedby={id}
                  variant="contained"
                  onClick={handlePanel}
                  sx={{ color: "white" }}
                >
                  Admin Panel
                </Button>
              )}
              <Popover
                id={idPanel}
                open={openPanel}
                anchorEl={anchorElPanel}
                onClose={handleClosePanel}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <List>
                  <ListItem>
                    <Button onClick={() => handleNavigate("/admin/products")}>
                      Products
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Button onClick={() => handleNavigate("/admin/users")}>
                      Users
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Button onClick={() => handleNavigate("/admin/orders")}>
                      Orders
                    </Button>
                  </ListItem>
                </List>
              </Popover>
              {userInfo ? (
                <Button
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                  sx={{ color: "white" }}
                >
                  {userInfo.name}
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  sx={{ color: "#fff" }}
                >
                  SIGN IN
                </Button>
              )}
            </Box>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <List>
                <ListItem>
                  <Button
                    onClick={() => {
                      navigate("/profile");
                      handleClose();
                    }}
                  >
                    Profile
                  </Button>
                </ListItem>
                <Divider />
                <ListItem>
                  <Button onClick={handleLogout}>Logout</Button>
                </ListItem>
              </List>
            </Popover>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
