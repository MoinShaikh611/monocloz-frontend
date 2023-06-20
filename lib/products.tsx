import { API_URL } from "environment/environment";

export async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/api/products`);

    if (!response.ok) {
      throw new Error("API request failed");
    }
    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
export async function getProductDetail(productId: string) {
  try {
    const response = await fetch(`${API_URL}/api/products/${productId}`);

    if (!response.ok) {
      throw new Error("API request failed");
    }
    const productDetail = await response.json();

    return productDetail;
  } catch (error) {
    console.error("Error fetching products:", error);
    return error;
  }
}
