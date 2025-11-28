import { User } from "../models/user.js";
import { Cart } from "../models/cart.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import sendEmail from "../services/mailer.js";

export const login = async (req, res) => {
  const { data } = req.body;
  const { username, password } = data;
  const user = await User.findOne({ username });

  if (!user)
    return res
      .status(404)
      .json({ status: "error", message: "utente/password errata" });

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET
    );
    return res.status(200).json({ status: "ok", data: token, user: user });
  }

  res.status(401).json({ status: "error", message: "utente/password errata" });
};

export const register = async (req, res) => {
  const { data } = req.body;
  const { username, password, email } = data;
  if (!username || typeof username != "string") {
    return res.json({ status: "error", message: "username non valido" });
  }

  if (!password || typeof username != "string") {
    return res.json({ status: "error", message: "password non valido" });
  }

  if (password.length < 6) {
    return res
      .status(500)
      .json({ status: "error", message: "password troppo corta" });
  }

  const passwordHashed = await bcrypt.hash(password, 10);
  const user = new User({
    username: username,
    password: passwordHashed,
    email: email,
  });

  const cart = new Cart({
    username: username,
    products: [],
  });

  try {
    await user.save();
    await cart.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ status: "error", message: error.message });
  }
};

export const recoverPassword = async (req, res) => {
  const { data } = req.body;
  const { email } = data;
  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "error", message: "Email non trovata" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpire = Date.now() + 1000 * 60 * 15; // valido 15 minuti

  user.resetToken = resetToken;
  user.resetTokenExpire = resetTokenExpire;
  await user.save();

  const resetLink = `http://localhost:3002/resetPassword?token=${resetToken}&id=${user._id}`;
  await sendEmail(
    user.email,
    "Reset della password",
    `Clicca sul link per resettare la password: ${resetLink}`
  );

  res.json({ status: "ok", message: "Email inviata con link per il reset" });
};

export const resetPassword = async (req, res) => {
  const { data } = req.body;
  const { userId, token, newPassword } = data;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "Utente non trovato" });
    }

    // Verifica token e scadenza
    if (
      user.resetToken !== token ||
      !user.resetTokenExpire ||
      user.resetTokenExpire < Date.now()
    ) {
      return res
        .status(401)
        .json({ status: "error", message: "Token non valido o scaduto" });
    }

    // Hash della nuova password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Pulisce il token usato
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    return res.json({
      status: "ok",
      message: "Password aggiornata con successo",
    });
  } catch (err) {
    console.error("Errore nel reset:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Errore interno del server" });
  }
};
