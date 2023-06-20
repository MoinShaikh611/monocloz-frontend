import { create } from "zustand";

type AuthStore = {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => {
  const initialLoggedIn =
    typeof localStorage !== "undefined" &&
    localStorage.getItem("loggedIn") === "true";

  return {
    loggedIn: initialLoggedIn,
    login: () => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("loggedIn", "true");
      }
      set({ loggedIn: true });
    },
    logout: () => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("loggedIn", "false");
      }
      set({ loggedIn: false });
    },
  };
});

export default useAuthStore;
