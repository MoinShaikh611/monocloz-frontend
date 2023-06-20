"use client";
import { useEffect, useState } from "react";
import { loginUser } from "../api/auth";
import { useRouter } from "next/navigation";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import useAuthStore from "app/store/authStore";
const Login = () => {
  const router = useRouter();
  const { login, loggedIn } = useAuthStore();

  // Check if user is already logged in
  useEffect(() => {
    if (loggedIn) {
      router.replace("/"); // Redirect to the dashboard if logged in
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        setError("Please enter a username and password");
        return;
      }

      const userData = { username, password };
      const response = await loginUser(userData);
      console.log(response);

      if (response.message === "Login successful") {
        const { token } = response;

        // Save the token in local storage
        localStorage.setItem("token", token);
        login();

        // Redirect to the previous page
        router.replace("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Not a Member? <Link href={"/register"}>Join us</Link>
      </p>
    </div>
  );
};

export default Login;
