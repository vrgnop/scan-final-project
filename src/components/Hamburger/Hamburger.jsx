import React from "react";
import hamburgLines from "../../assets/images/hamburger-lines.svg";
import hamburgCross from "../../assets/images/hambureger-cross.svg";
import styles from "./Hamburger.module.scss";
import Menu from "../Menu/Menu";
import Popup from "../Popup/Popup";
import SignHeader from "../SignHeader/SignHeader";
import whiteLogo from "../../assets/images/white-logo.svg";
import useAuth from "../../hooks/useAuth";

function Hamburger({ menu, setMenu }) {
  const [isShow, setShow] = React.useState(false);

  return (
    <div className={styles.wrapper}>
      <img onClick={() => setShow(true)} src={hamburgLines} />
      {isShow && (
        <>
          <Popup>
            <div className={styles.popupWrapper}>
              <div className={styles.crossWrapper}>
                <img src={whiteLogo} />
                <img
                  className={styles.cross}
                  onClick={() => setShow(false)}
                  src={hamburgCross}
                />
              </div>
              <Menu
                menu={menu}
                styleUl={{
                  flexDirection: "column",
                  color: "white",
                  paddingInlineStart: "0px",
                }}
                styleLi={{
                  margin: "20px 0",
                  fontSize: "28px",
                }}
                activeStyle={{
                  textDecoration: "underline",
                }}
                setMenu={setMenu}
                setShow={setShow}
              />
              <SignHeader setShow={setShow} />
            </div>
          </Popup>
        </>
      )}
    </div>
  );
}

export default Hamburger;
