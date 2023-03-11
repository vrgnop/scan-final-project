import React from "react";
import styles from "./SignHeader.module.scss";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { removeUser } from "../../redux/slices/userSlice";
import avatar from "../../assets/images/avatar.jpg";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

function SignHeader({ hideMobile, setShow }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickRemoveUser = () => {
    dispatch(removeUser());
    setShow && setShow(false);
  };
  const onClickSignIn = () => {
    navigate("/authorization/signin");
    setShow && setShow(false);
  };
  const onClickSignUp = () => {
    navigate("/authorization/signup");
    setShow && setShow(false);
  };

  if (useAuth().isAuth) {
    return (
      <div
        className={classNames(
          styles.profile,
          hideMobile ? styles.hideMobile : ""
        )}
      >
        <div className={styles.name}>
          <span>Никита С. </span>
          <button onClick={onClickRemoveUser}>Выйти</button>
        </div>
        <div className={styles.avatar}>
          <img src={avatar} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        styles.rightMenu,
        hideMobile ? styles.hideMobile : ""
      )}
    >
      <button onClick={onClickSignUp} className={styles.buttonSignUp}>
        Зарегистрироваться
      </button>
      <div></div>
      <button onClick={onClickSignIn} className={styles.buttonSignIn}>
        Войти
      </button>
    </div>
  );
}

export default SignHeader;
