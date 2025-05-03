import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import React from "react";

const Card = ({ item, addToCart, generaPrezzo, cartStatus, setCartStatus }) => {
  const handleClick = () => {
    addToCart({ name: item.title, price: generaPrezzo() });
    setCartStatus((prev) => ({ ...prev, [item.title]: "clicked" }));
    setTimeout(() => {
      setCartStatus((prev) => ({ ...prev, [item.title]: "init" }));
    }, 1000);
  };

  const limitaA20Lettere = (str) => {
    return str.length > 20 ? str.slice(0, 24) + "..." : str;
  };

  return (
    <WrapperCard>
      {item && <p>{limitaA20Lettere(item.title)}</p>}
      {item && <img src={item.image} alt={item.title} />}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <Link to={`/detail/${item.id}`}>
          <BiDetail />
        </Link>

        <div onClick={handleClick} style={{ cursor: "pointer" }}>
          {item && (
            <motion.div
              initial={{ scale: 0.8, color: "#000" }}
              animate={
                cartStatus[item.title] === "clicked"
                  ? { scale: 1.2, color: "#16a34a" }
                  : { scale: 0.8, color: "#000" }
              }
              transition={{ duration: 0.5 }}
              style={{ display: "inline-block", cursor: "pointer" }}
            >
              <FaCartPlus />
            </motion.div>
          )}
        </div>
      </div>
    </WrapperCard>
  );
};

const WrapperCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px auto;
  max-width: 350px;
  padding: 37px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 200px;
    border-radius: 12px;
  }

  p {
    text-align: center;
    color: #333;
    margin-top: 12px;
    position: relative;
    bottom: 15px;
  }

  svg {
    position: relative;
    top: 10px;
    width: 35px;
    height: 35px;
  }
`;

export default Card;
