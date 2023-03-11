import React from "react";
import styles from "./NotFound.module.scss";

function NotFound({ title, titleButton, onClickButton }) {
  return (
    <section className={styles.wrapper}>
      <h1>{title}</h1>
      <button onClick={onClickButton}>{titleButton}</button>
    </section>
  );
}

export default NotFound;
