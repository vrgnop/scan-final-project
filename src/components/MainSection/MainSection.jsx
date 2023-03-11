import React from "react";
import styles from "./MainSection.module.scss";

function MainSection({ title, description, image }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.text}>
        <h1>{title}</h1>
        <span>{description}</span>
      </div>
      <div>
        <img src={image} />
      </div>
    </section>
  );
}

export default MainSection;
