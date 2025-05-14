import express from "express";
import {
  setCart,
  getCart,
  removeCartById,
  removeAllCart
} from "../controllers/product.js";

const router = express.Router();

router.post("/insertCart", setCart);
router.post("/getCart", getCart);
router.delete("/removeAllCart", removeAllCart);
router.delete("/removeCart/:id", removeCartById);

export default router;
