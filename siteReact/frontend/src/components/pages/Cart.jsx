import { useCart } from "../../CartContext";
import React from "react";

export default function Cart() {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        🛒 Il tuo Carrello
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Il carrello è vuoto.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cart.map((item, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.price}€</p>
              </div>
              <button
                onClick={() => removeFromCart(i)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded shadow"
              >
                Rimuovi
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 border-t pt-4 text-right">
        <p className="text-lg font-semibold text-gray-700">
          Totale: <span className="text-green-600">{total}€</span>
        </p>
      </div>
    </div>
  );
}
