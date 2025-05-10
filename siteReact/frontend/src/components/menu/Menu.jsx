import React, { useState } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Search from "./Search";
import { MdShoppingCartCheckout, MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";

const Menu = () => {
  const [showDialog, setShowDialog] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const username = JSON.parse(localStorage.getItem("user"))?.username || "utente";

  return (
    <>
      <WrapperButton>
        <IconButton as="button" onClick={() => setShowDialog(true)} title="Profilo">
          <FaUserCircle />
        </IconButton>
        <IconButton as={Link} to="/cart" title="Vai al carrello">
          <MdShoppingCartCheckout />
        </IconButton>
        <IconButton as="button" onClick={handleLogout} title="Logout">
          <MdLogout />
        </IconButton>
      </WrapperButton>

      {showDialog && (
        <Overlay onClick={() => setShowDialog(false)}>
          <DialogBox onClick={(e) => e.stopPropagation()}>
            <p>Sei autenticato come <strong>{username}</strong></p>
            <CloseButton onClick={() => setShowDialog(false)}>Chiudi</CloseButton>
          </DialogBox>
        </Overlay>
      )}

      <Search />
      <Category />
    </>
  );
};


const WrapperButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 16px;
  z-index: 10;
`;

const IconButton = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #374151;

  &:hover {
    background-color: #e5e7eb;
    transform: scale(1.1);
    color: #111827;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const DialogBox = styled.div`
  background: white;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 16px;
  background-color: #374151;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #111827;
  }
`;


export default Menu;
