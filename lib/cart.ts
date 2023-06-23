import { API_URL } from "environment/environment";

export const addToCartAfterLogin = async (
  productId: string,
  quantity: number
) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the JWT token from local storage
    const headers: { "Content-Type": string; Authorization?: string } = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = "Bearer " + token; // Include the JWT token in the Authorization header
    }
    const response = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    const data = await response.json();
    console.log("Item added to cart:", data);
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};
