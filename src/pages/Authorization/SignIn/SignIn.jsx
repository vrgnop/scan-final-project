import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";
import google from "../../../assets/images/google.svg";
import facebook from "../../../assets/images/facebook.svg";
import yandex from "../../../assets/images/yandex.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  removeStatus,
  setUser,
} from "../../../redux/slices/userSlice";
import Loader from "../../../components/Loader/Loader";
import Input from "../../../components/Input/Input";

function SignIn() {
  const [login, setLogin] = React.useState("");
  const [pureLogin, setPureLogin] = React.useState("");
  const { status, err } = useSelector((state) => state.user);
  const [pass, setPass] = React.useState("");
  const [errLogin, setErrLogin] = React.useState({ isErr: false, message: "" });
  const [errPass, setErrPass] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const phoneFullReg = /^[\d\+][\d\(\)\ -]{9}\d$/;
  const phoneReg = /(?:\+)[\d\-\(\) ]{0,20}/g;
  const loginReg = /^[a-zA-Z]/;
  const ruReg = /[а-яА-я]/;

  React.useEffect(() => {
    if (status === "success") {
      location.state === null
        ? navigate("/")
        : navigate(location.state.from.pathname);
    }
  }, [status]);

  React.useEffect(() => {
    return () => {
      dispatch(removeStatus());
    };
  }, []);

  const handleLogin = (login, password) => {
    dispatch(setUser({ login: login }));
    dispatch(
      fetchUser({
        login: pureLogin,
        password: password,
      })
    );
  };

  if (status === "loading") {
    return <Loader title={"Загружаем данные"} />;
  }

  const onChangeLogin = (e) => {
    e.target.value = e.target.value.trim();

    if (errLogin) {
      (e.target.value.match(phoneFullReg) &&
        setErrLogin({ isErr: false, message: "" })) ||
        (e.target.value.match(loginReg) &&
          setErrLogin({ isErr: false, message: "" }));
    }

    if (e.target.value.match(ruReg)) {
      console.log(e.target.value.match(ruReg));
      setErrLogin({ isErr: true, message: "Используйте латинские буквы" });
    }
    //Ввод телефона
    if (
      e.target.value.match(phoneReg) ||
      (e.target.value.length === 1 && !e.target.value.match(/[^0-9]/g))
    ) {
      const matrixDef = "+7 (___) ___-__-__";
      const def = matrixDef.replace(/\D/g, "");
      let val =
        e.target.value.replace(/\D/g, "").length <= 11
          ? e.target.value.replace(/\D/g, "")
          : pureLogin;
      e.target.selectionStart = e.target.value.length;
      let i = 0;
      if (def.length >= val.length && login.length <= val.length) val = def;
      e.target.value = matrixDef.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length
          ? val.charAt(i++)
          : i >= val.length
          ? ""
          : a;
      });
      setPureLogin(val);
      setLogin(e.target.value);
    }
    //Ввод логина
    if (e.target.value.match(loginReg) || e.target.value.length === 0) {
      let val = e.target.value.replace(ruReg, "");
      setLogin(val);
      setPureLogin(val);
    }
  };

  const onChangePass = (e) => {
    e.target.value = e.target.value.trim();
    setPass(e.target.value);
    if (errPass) {
      e.target.value !== "" && setErrPass(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      <form onSubmit={(e) => e.preventDefault()}>
        {status === "error" && <span>{err}</span>}
        <Input
          label={"Логин или номер телефона:"}
          value={login}
          type={"tel"}
          isRequired={true}
          onBlur={(e) =>
            pureLogin.match(phoneFullReg)
              ? setErrLogin({ isErr: false, message: "" })
              : e.target.value.match(loginReg)
              ? setErrLogin({ isErr: false, message: "" })
              : setErrLogin({
                  isErr: true,
                  message: "Введите корректные данные",
                })
          }
          onChange={onChangeLogin}
          err={errLogin.isErr}
          messageErr={errLogin.message}
          errForm={status}
        />
        <Input
          label={"Пароль:"}
          value={pass}
          isRequired={true}
          type={"password"}
          onBlur={(e) =>
            e.target.value === "" ? setErrPass(true) : setErrPass(false)
          }
          onChange={onChangePass}
          err={errPass}
          messageErr={"Пароль не может быть пустым"}
          errForm={status}
        />
        <input
          onClick={() => handleLogin(login, pass)}
          type={"submit"}
          value={"Войти"}
          disabled={
            pureLogin.length !== 0 &&
            pass.length !== 0 &&
            !errLogin.isErr &&
            !errPass
              ? false
              : true
          }
        />
      </form>
      <a>Восстановить пароль</a>
      <div className={styles.services}>
        <label>Войти через:</label>
        <div>
          <button className={styles.google}>
            <img src={google} />
          </button>
          <button className={styles.facebook}>
            <img src={facebook} />
          </button>
          <button className={styles.yandex}>
            <img src={yandex} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
