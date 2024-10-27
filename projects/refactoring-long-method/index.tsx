"use client";

import React, { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const productsDb = [
  {
    id: 1,
    name: "Produto A",
    price: 50,
    stock: 5,
  },
  {
    id: 2,
    name: "Produto B",
    price: 30,
    stock: 3,
  },
];

export const RefactoringLongMethod = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addItem = (newItem: Partial<CartItem>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    if (totalAmount > 100) {
      totalAmount *= 0.9;
    }

    // Enviar notificação de sucesso
    alert(`Pedido realizado com sucesso! Total: $${totalAmount.toFixed(2)}`);
    setTotal(totalAmount);
  };

  return (
    <div className="w-full h-100vh flex justify-center ">
      <div className="w-full flex justify-center flex-col max-w-[600px] gap-8">
        <div className="flex justify-between mt-6 space-x-4">
          {productsDb.map((product) => (
            <button
              key={product.id}
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: 1,
                })
              }
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
            >
              Adicionar {product.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
            >
              <span className="text-gray-700">
                {item.name} - ${item.price} x {item.quantity}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 mb-4"
          >
            Finalizar Pedido
          </button>
          <p className="text-lg font-semibold text-gray-700 text-center mb-6">
            Total: ${total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};
