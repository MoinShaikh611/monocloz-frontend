"use client";
import React from "react";
import { useCart } from "contexts/CartContext";

const Cart: React.FC = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart();

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.productId}>
                <span>{item.name}</span>
                <span>Quantity: {item.quantity}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
                &nbsp;
                <button
                  className="add-to-cart-btn"
                  onClick={() => decreaseQuantity(item.productId)}
                >
                  -
                </button>
                <br />
                <button
                  className="add-to-cart-btn"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
