import React from "react";
import Functions from "../../functions/functions";
import styles from "./Button.module.scss";
import classNames from "classnames";

function Button({ name, onClick, backgroundColor, stylesObj }) {
  const buttonRef = React.useRef();
  React.useEffect(() => {
    buttonRef.current.style.color = Functions.getIsDarkness(
      buttonRef.current.style.backgroundColor ||
        window.getComputedStyle(buttonRef.current).backgroundColor
    )
      ? "white"
      : "black";
  });

  return (
    <button
      className={classNames(styles.button)}
      style={{ ...stylesObj, backgroundColor: backgroundColor }}
      ref={buttonRef}
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
}

export default Button;
