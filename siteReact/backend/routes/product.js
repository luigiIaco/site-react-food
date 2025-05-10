import express from "express";
import {
  setProductsCart,
  getProductsCart,
  removeProductCart,
} from "../controllers/product.js";

const router = express.Router();

router.post("/insertCartProduct", setProductsCart);
router.post("/getCartProduct", getProductsCart);
router.post("/removeCartProduct", removeProductCart);

export default router;
