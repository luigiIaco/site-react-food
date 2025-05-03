import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import "@splidejs/react-splide/css";
import Cucina from "./components/pages/Cucina";
import Error404 from "./components/error/Error404";
import Menu from "./components/menu/Menu";
import React from "react";
import Searched from "./components/pages/Searched";
import Details from "./components/pages/Details";
import Cart from "./components/pages/Cart";
import { CartProvider } from "./CartContext";

function App() {
  const location = useLocation();
  const showCategory = location.pathname !== "/404";
  return (
    <>
      {showCategory && <Menu />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cucina/:type" element={<Cucina />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search/:searchValue" element={<Searched />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default function AppRoutes() {
  return (
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  );
}
