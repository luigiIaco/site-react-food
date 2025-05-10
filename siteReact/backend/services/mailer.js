import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD, // App Password da Gmail
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"Tuo Nome" <${process.env.EMAIL_SENDER}>`,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Errore invio email:", error);
    throw error;
  }
};

export default sendEmail;
