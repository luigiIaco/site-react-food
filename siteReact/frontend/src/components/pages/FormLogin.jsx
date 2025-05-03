import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulazione invio dati
      const response = await fetch("https://tuo-backend.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registrazione avvenuta con successo!");
      } else {
        setMessage("Errore durante la registrazione.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Errore di rete.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrati</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrati</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Form;
