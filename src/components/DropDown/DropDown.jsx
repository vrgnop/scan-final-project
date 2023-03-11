import React from "react";
import classNames from "classnames";
import styles from "./DropDown.module.scss";
import Functions from "../../functions/functions";

//Компонент для создания выпадающего списка

function DropDown({ items, keys, onClick, selectItem }) {
  const [isShowItem, setShowItem] = React.useState(false);
  const dropdownRef = React.useRef();

  React.useEffect(() => {
    const onClickHideMenu = (e) => {
      if (!e.composedPath().includes(dropdownRef.current)) {
        setShowItem(false);
      }
    };
    document.body.addEventListener("click", onClickHideMenu);
    return () => document.body.removeEventListener("click", onClickHideMenu);
  }, []);

  const onClickDropDown = (e) => {
    setShowItem(false);
    onClick(e);
  };

  return (
    <div ref={dropdownRef} className={styles.wrapper}>
      <div
        className={classNames(styles.arrow, isShowItem ? styles.open : "")}
        onClick={() => setShowItem(!isShowItem)}
      ></div>
      {(isShowItem && (
        <>
          <input
            type={"button"}
            value={""}
            className={classNames(styles.button, styles.close)}
            onClick={() => setShowItem(!isShowItem)}
          ></input>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <input
                  type={"button"}
                  value={item[keys]}
                  className={classNames(
                    styles.items,
                    index === items.length - 1 ? styles.lastItem : ""
                  )}
                  onClick={(e) => onClickDropDown(e)}
                ></input>
              </li>
            ))}
          </ul>
        </>
      )) || (
        <input
          type={"button"}
          value={selectItem}
          className={classNames(styles.button, styles.open)}
          onClick={() => setShowItem(!isShowItem)}
          disabled={items.length === 0 ? true : false}
        ></input>
      )}
    </div>
  );
}

export default DropDown;
