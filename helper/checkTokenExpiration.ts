import { useAuth } from "contexts/authContext";
import { getToken, removeToken } from "./auth";
import decodeJwtToken from "./decodeJwtToken";

export default function checkTokenExpiration() {
  const token = getToken();
  const { logout } = useAuth();

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
}
