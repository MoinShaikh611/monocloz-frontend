"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

// Define the type for the cart item
type CartItem = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
};

// Define the type for the cart context value
type CartContextValue = {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void; // Added clearCart function
};

// Create the cart context
export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);

// Create a custom hook to access the cart context
export const useCart = (): CartContextValue => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return cartContext;
};

// Create a cart provider component
export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add a product to the cart
  const addToCart = (product: CartItem) => {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(
      (item) => item.productId === product.productId
    );

    if (existingProduct) {
      // If the product exists, update its quantity
      const updatedCart = cart.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      // If the product doesn't exist, add it to the cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to decrease the quantity of a product in the cart
  const decreaseQuantity = (productId: string) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId: string) => {
    // Remove the product from the cart state
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    // Load cart data from local storage on initialization
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Save updated cart data to local storage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartContextValue: CartContextValue = {
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
