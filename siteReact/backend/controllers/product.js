import { Cart } from "../models/cart.js";

export const setCart = async (req, res) => {
  const { data } = req.body;
  const { username, product, amount, price } = data;
  var cart = await Cart.findOne({ username });

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
  
  await cart.save();

  res.status(200).json({ status: "ok", message: "Aggiunto al carrello" });
};

export const getCart = async (req, res) => {
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

export const removeCartById = async (req, res) => {
  const {id} = req.params;
  const { data } = req.body;
  const { cartId, quantityToRemove } = data;
  const cart = await Cart.findById({ _id: cartId });
  let removedItem = cart.products.find(
    (item) => item._id.toString() === id
  );

  if (!removedItem) return res.status(404).json({ message: "Prodotto non trovato nel carrello" });
  removedItem.amount -= quantityToRemove;

  // Rimuovi l'oggetto se la quantità scende a 0 o meno
  if (removedItem.amount <= 0) {
    cart.products = cart.products.filter(
      (item) => item._id.toString() !== id
    );
  }

  await cart.save();
  res.status(200).json({ message: "Prodotto aggiornato correttamente", cart });
};

export const removeAllCart = async (req, res) => {
  const { data } = req.body;
  const {username} = data;
  const cart = await Cart.findOne({ username: username });
  if (!cart) return res.status(404).json({ message: "Carrello non trovato" });
  cart.products = [];

  await cart.save();
  res.status(200).json({ message: "Carrello svuotato" });
};
