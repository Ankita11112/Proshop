import HomeScreen from "./screens/HomeScreen";
import Navbar from "./components/Navbar";
import Darkmode from "./utils/Darkmode";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProductScreen from "./screens/SingleProductScreen";
import { Container } from "@mui/material";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import CartSreen from "./screens/CartSreen";
import ProfileScreen from "./screens/ProfileScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import ProductPanel from "./screens/adminPanel/ProductPanel";
import UserPanel from "./screens/adminPanel/UserPanel";
import OrderPanel from "./screens/adminPanel/OrderPanel";

function App() {
  return (
    <BrowserRouter>
      <Darkmode>
        <Navbar />
        <main id="body">
          <Container maxWidth="xl">
            <Routes>
              <Route path={"/"} element={<HomeScreen />} />
              <Route path={"/product/:_id"} element={<SingleProductScreen />} />
              <Route path={"/register"} element={<RegisterScreen />} />
              <Route path={"/login"} element={<LoginScreen />} />
              <Route path={"/cart"} element={<CartSreen />} />
              <Route path={"/profile"} element={<ProfileScreen />} />
              <Route path={"/checkout"} element={<CheckoutScreen />} />
              <Route path="/admin">
                <Route path="products" element={<ProductPanel />} />
                <Route path="users" element={<UserPanel />} />
                <Route path="orders" element={<OrderPanel />} />
              </Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <span>Copyright &copy 2022</span>
        </footer>
      </Darkmode>
    </BrowserRouter>
  );
}

export default App;
