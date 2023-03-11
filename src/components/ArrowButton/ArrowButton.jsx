import React from "react";
import styles from "./ArrowButton.module.scss";
import classNames from "classnames";

function ArrowButton({ onClick, direction, disabled, absolutePos }) {
  return (
    <div
      className={classNames(
        styles.wrapper,
        styles[direction],
        absolutePos && styles.absolute
      )}
      disabled={disabled}
    >
      <button
        disabled={disabled}
        onClick={onClick}
        className={classNames(styles.arrow, styles[direction])}
      ></button>
    </div>
  );
}

export default ArrowButton;
