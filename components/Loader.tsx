import React from "react";
import styles from "@/styles/loader.module.css";
function Loader() {
  return (
    <div className={`${styles.loading} ${true ? styles.visible : ""}`}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loader;
