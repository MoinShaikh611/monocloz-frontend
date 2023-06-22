"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useCart } from "contexts/CartContext";
import styles from "@/styles/cart.module.css";
import Loader from "@/components/Loader";
const Cart: React.FC = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className={styles.container}>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.productId}>
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${Math.floor(item.quantity * item.price)}</p>
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
                  style={{ margin: "10px 0" }}
                  className="add-to-cart-btn"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button onClick={clearCart} className="add-to-cart-btn">
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
