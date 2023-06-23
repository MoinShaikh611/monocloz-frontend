// pages/api.ts
const API_URL = "http://localhost:5001";
// Register user
export const registerUser = async (userData: {
  username: string;
  mobile: string;
  password: string;
}): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Login user
export const loginUser = async (userData: {
  password: string;
  mobile: string;
}): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
