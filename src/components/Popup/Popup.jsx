import React from "react";
import styles from "./Popup.module.scss";

function Popup({ children }) {
  React.useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return <div className={styles.popup}>{children}</div>;
}

export default Popup;
