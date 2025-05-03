import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Search from "./Search";
import Logo from "../../ui/Logo";
import { MdShoppingCartCheckout } from "react-icons/md";
import styled from "styled-components";

const Menu = () => {
  return (
    <>
      <CartLink to="/cart">
        <MdShoppingCartCheckout />
      </CartLink>
      <Logo />
      <Search />
      <Category />
    </>
  );
};

const CartLink = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #f97316; /* arancione caldo */
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.3s ease;

  svg {
    width: 30px;
    height: 30px;
    color: white;
  }

  &:hover {
    background-color: #ea580c;
    transform: scale(1.1);
  }
`;

export default Menu;
