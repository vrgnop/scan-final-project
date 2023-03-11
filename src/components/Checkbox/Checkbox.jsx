import React from "react";
import styles from "./Checkbox.module.scss";

function Checkbox({ title, check, index, onCLick }) {
  const alfa = ["a", "b", "c", "d", "e", "f", "i", "j", "k", "l"];
  const randomId =
    "checkbox__" +
    Math.floor(Math.random() * 1000000000)
      .toString()
      .split("")
      .map((item) => alfa[item])
      .join("");

  return (
    <div key={index} className={styles.checkbox}>
      <input
        id={randomId}
        checked={check}
        onChange={() => onCLick(index)}
        type={"checkbox"}
      />
      <label className={!check ? styles.unCheck : ""} htmlFor={randomId}>
        {title}
      </label>
    </div>
  );
}

export default Checkbox;
