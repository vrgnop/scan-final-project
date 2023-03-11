import React from "react";
import styles from "./Input.module.scss";

function Input({
  label,
  value,
  type,
  isRequired,
  onChange,
  onBlur,
  err,
  messageErr,
  errForm,
  placeholder = "",
}) {
  return (
    <div className={styles.wrapper}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={err || errForm === "error" ? styles.err : null}
        required={isRequired}
        onChange={(e) => onChange(e)}
        onBlur={(e) => onBlur && onBlur(e)}
      />
      {err && <span className={styles.errMessage}>{messageErr}</span>}
    </div>
  );
}

export default Input;
