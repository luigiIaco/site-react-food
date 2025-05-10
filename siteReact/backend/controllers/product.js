import { Cart } from "../models/cart.js";
import mongoose from "mongoose";

export const setProductsCart = async (req, res) => {
  const { data } = req.body;
  const { username, product, amount, price } = data;
  var cart = await Cart.findOne({ username });

  if (!cart) {
    cart = new Cart({
      username: username,
      products: [{ product: product, price: price, amount: amount }],
    });
  } else {
    const existingProduct = cart.products.find(
      (obj) => obj.product === product
    );
    if (existingProduct) {
      existingProduct.amount += amount; // 🔼 incrementa la quantità
    } else {
      cart.products.push({
        product: product,
        price: price,
        amount: amount,
      });
    }
  }
  await cart.save();

  res.status(200).json({ status: "ok", message: "Aggiunto al carrello" });
};

export const getProductsCart = async (req, res) => {
  const username = req.body.data;
  var cart = await Cart.findOne({ username });
  if (!cart) {
    res
      .status(500)
      .json({ status: "ok", message: "Errore nel recupero del carrello" });
  } else {
    res.status(200).json({ status: "ok", data: cart });
  }
};

export const removeProductCart = async (req, res) => {
  const { data } = req.body;
  const { cartId, productId, quantityToRemove } = data;
  const cart = await Cart.findById({ _id: cartId });
  let removedItem = cart.products.find(
    (item) => item._id.toString() === productId
  );

  if (!removedItem) return res.status(404).json({ message: "Prodotto non trovato nel carrello" });
  removedItem.amount -= quantityToRemove;

  // Rimuovi l'oggetto se la quantità scende a 0 o meno
  if (removedItem.amount <= 0) {
    cart.products = cart.products.filter(
      (item) => item._id.toString() !== productId
    );
  }

  await cart.save();
  res.status(200).json({ message: "Prodotto aggiornato correttamente", cart });
};
