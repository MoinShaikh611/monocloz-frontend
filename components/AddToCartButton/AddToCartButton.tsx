"use client";
import { useRouter } from "next/navigation";
import { useCart } from "contexts/CartContext";
import { useState } from "react";

export const AddToCartButton: React.FC<{ product: any }> = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      quantity: 1,
      name: product.name,
      price: product.price,
    };

    addToCart(cartItem);
    setAddedToCart(true);
  };

  const handleGoToBag = () => {
    router.push("/cart"); // Redirect to the cart page
  };

  return (
    <button
      onClick={addedToCart ? handleGoToBag : handleAddToCart}
      className="add-to-cart-btn w-100"
    >
      {addedToCart ? "Go to Bag" : "Add to Cart"}
    </button>
  );
};
