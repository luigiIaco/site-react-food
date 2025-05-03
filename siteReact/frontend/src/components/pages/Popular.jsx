import React, { useEffect, useState } from "react";
import { getPopularService } from "../../service/recipes.service";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Card from "../../ui/Card";
import { useCart } from "../../CartContext";

const Popular = () => {
  const localstorageKey = "popular";
  const [popular, setPopular] = useState([]);
  const [cartStatus, setCartStatus] = useState({});
  const [animazione, setAnimazione] = useState(false);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    getPopular();
  }, []);

  const generaPrezzo = () => {
    const nuovoPrezzo = (Math.random() * (50 - 5) + 5).toFixed(2);
    return Number(nuovoPrezzo);
  };

  const getPopular = async () => {
    const localstore = localStorage.getItem(localstorageKey);
    if (localstore) {
      setPopular(JSON.parse(localstore));
    } else {
      const data = await getPopularService(5, "vegetarian");
      if (data && data.recipes) {
        localStorage.setItem(localstorageKey, JSON.stringify(data.recipes));
        setPopular(data.recipes);
      }
    }
  };
  return (
    <>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Piatti popolari</p>
      <Wrapper>
        <Splide
          options={{
            perPage: 2,
            gap: "0.5rem",
            pagination: false,
            arrows: true,
          }}
        >
          {popular.map((item) => {
            return (
              <SplideSlide key={item.id}>
                <Card
                  key={item.id}
                  item={item}
                  addToCart={addToCart}
                  generaPrezzo={generaPrezzo}
                  cartStatus={cartStatus}
                  setCartStatus={setCartStatus}
                />
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export default Popular;
