"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useCart } from "contexts/CartContext";
import styles from "@/styles/cart.module.css";
import Loader from "@/components/Loader";
import { getToken, removeToken } from "helper/auth";
import decodeJwtToken from "helper/decodeJwtToken";
import { useAuth } from "contexts/authContext";
const Cart: React.FC = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart();
  const { logout } = useAuth();

  const token = getToken();

  if (token) {
    try {
      const decodedToken = decodeJwtToken(token);

      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

      if (decodedToken.exp && currentTime >= decodedToken.exp) {
        // Token has expired, redirect to the login page
        window.location.href = "/login";
        removeToken();
        logout();
      }
    } catch (error) {
      console.error("Token decoding failed:", error);
      // Handle token decoding error if necessary
    }
  }

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
