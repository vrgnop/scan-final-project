import React from "react";
import loading from "../../assets/images/loading.svg";
import styles from "./Loader.module.scss";
import classNames from "classnames";

function Loader({ title, type, width }) {
  if (type === "block") {
    return (
      <div className={classNames(styles.wrapper, styles.block)}>
        <img src={loading} />
        {title && <p>{title}</p>}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <img width={width && width} src={loading} />
      {title && <p>{title}</p>}
    </div>
  );
}

export default Loader;
