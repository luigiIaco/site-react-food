import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Search from "./Search";
import { MdShoppingCartCheckout } from "react-icons/md";
import styled from "styled-components";
import { MdLogout } from "react-icons/md";

const Menu = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };
  
  return (
    <>
      <CartLink to="/cart">
        <MdShoppingCartCheckout />
      </CartLink>
      <LogoutButton>
      <MdLogout onClick={handleLogout} />
      </LogoutButton>
      <Search />
      <Category />
    </>
  );
};

const CartLink = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color:rgb(22, 101, 249); /* arancione caldo */
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

const LogoutButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color:red; /* arancione caldo */
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
