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
  const [mobile, setMobile] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!mobile || !password || !username) {
        setError("Please enter a mobile or password or username");
        return;
      }

      const userData = { username, password, mobile };
      const response = await registerUser(userData);
      console.log(response); // Handle success, e.g., redirect to login page

      if (response.message === "User registered successfully") {
        setSuccess("Registration successful. Please login.");
        setUsername("");
        setPassword("");
        setMobile("");
        setError("");
        setTimeout(() => {
          router.push("/login");
        }, 3000);
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
            <label>Mobile Number:</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
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
