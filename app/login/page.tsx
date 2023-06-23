"use client";
import { useEffect, useState } from "react";
import { loginUser } from "../api/auth";
import { useRouter } from "next/navigation";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import { useAuth } from "contexts/authContext";
import Loader from "@/components/Loader";
import { setToken } from "helper/auth";
const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { login, loggedIn } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    try {
      if (loggedIn) {
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!password || !mobile) {
        setError("Please enter a mobile and password");
        return;
      }

      const userData = { password, mobile };
      const response = await loginUser(userData);
      console.log(response);

      if (response.message === "Login successful") {
        const { token } = response;

        // Save the token in local storage
        setToken(token);
        login();

        // Redirect to the previous page
        router.replace("/");
      } else {
        setError("Invalid username or mobile");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!isLoading) {
    return (
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
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
  }
};

export default Login;
