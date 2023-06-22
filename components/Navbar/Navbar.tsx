"use client";
import { useCart } from "contexts/CartContext";
import { useAuth } from "contexts/authContext";
import SuppressHydrationWarning from "helper/SuppressHydrationWarning";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Navbar: React.FC = () => {
  useEffect(() => {
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar") as HTMLElement;
    const handleScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        navbar.style.top = "-80px";
      } else {
        navbar.style.top = "0";
      }
      lastScrollTop = scrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const router = useRouter();
  const { loggedIn, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout(); // Call the logout action from the store
    router.push("/"); // Redirect to the home page
  };

  return (
    <nav className="navbar" id="navbar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        {cart.length !== 0 ? (
          <li>
            <Link href="/cart">
              <button className="add-to-cart-btn">
                {cart.length}&nbsp;
                {cart.length === 1 ? "Item in Bag" : "Items in Bag"}
              </button>
            </Link>
          </li>
        ) : (
          <li></li>
        )}

        <SuppressHydrationWarning>
          {loggedIn ? (
            <li>
              <button onClick={handleLogout}>Sign Out</button>
            </li>
          ) : (
            <li>
              <button onClick={() => router.replace("/login")}>Sign In</button>
            </li>
          )}
        </SuppressHydrationWarning>
      </ul>
    </nav>
  );
};

export default Navbar;
