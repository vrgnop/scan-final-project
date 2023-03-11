import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Menu.module.scss";
import classNames from "classnames";

function Menu({
  menu,
  styleUl,
  styleLi,
  activeStyle,
  hiddenMobile,
  hiddenDesktop,
  setMenu,
  setShow,
}) {
  const navigate = useNavigate();

  const onClickLink = (item, i) => {
    navigate(item.link);
    menu.forEach((item, u) => {
      menu[u].active = u === i;
    });
    setMenu(menu);
    setShow && setShow(false);
  };
  return (
    <ul
      className={classNames(
        styles.ul,
        hiddenMobile ? styles.hiddenMobile : "",
        hiddenDesktop ? styles.hiddenDesktop : ""
      )}
      style={styleUl}
    >
      {menu.map((item, i) => {
        return (
          <li
            onClick={() => onClickLink(item, i)}
            className={item.active ? styles.active : ""}
            style={item.active ? { ...styleLi, ...activeStyle } : styleLi}
            key={i}
          >
            {item.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Menu;
