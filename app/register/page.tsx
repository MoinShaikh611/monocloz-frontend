"use client";
import { useEffect, useState } from "react";
import { registerUser } from "../api/auth";
import styles from "@/styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "contexts/authContext";
import Loader from "@/components/Loader";

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { loggedIn } = useAuth();
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        setError("Please enter a username and password");
        return;
      }

      const userData = { username, password };
      const response = await registerUser(userData);
      console.log(response); // Handle success, e.g., redirect to login page

      if (response.message === "Registration successful") {
        setSuccess("Registration successful. Please login.");
        setUsername("");
        setPassword("");
        setError("");
      } else {
        setError("Registration failed. Please try again.");
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}
          <button type="submit">Register</button>
        </form>
        <p>
          Already a Member? <Link href={"/login"}>Sign In</Link>
        </p>
      </div>
    );
  }
};

export default Register;
