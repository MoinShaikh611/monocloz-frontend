"use client";
import { useCart } from "contexts/CartContext";

export const AddToCartButton: React.FC<{ product: any }> = ({ product }) => {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      quantity: 1,
      name: product.name,
      price: product.price,
    };
    addToCart(cartItem);
  };

  return (
    <button onClick={handleAddToCart} className="add-to-cart-btn w-100">
      Add to Cart
    </button>
  );
};
