import React from "react";
import styles from "./Sections.module.scss";

function Sections({ title, titleSize, children, description }) {
  if (description) {
    return (
      <section className={styles.withDesc}>
        <h2 style={titleSize && { fontSize: titleSize }}>{title}</h2>
        <span className={styles.span}>{description}</span>
        {children}
      </section>
    );
  }
  return (
    <section className={styles.withoutDesc}>
      <h2 style={titleSize && { fontSize: titleSize }}>{title}</h2>
      {children}
    </section>
  );
}

export default Sections;
