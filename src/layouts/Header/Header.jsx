import React from "react";
import logo from "../../assets/images/logo.svg";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/images/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";
import { fetchUserInfo } from "../../redux/slices/userInfoSlice";
import Loader from "../../components/Loader/Loader";
import Hamburger from "../../components/Hamburger/Hamburger";
import Menu from "../../components/Menu/Menu";
import SignHeader from "../../components/SignHeader/SignHeader";

function Header() {
  const [menu, setMenu] = React.useState([
    {
      name: "Главная",
      link: "/",
      active: false,
    },
    {
      name: "Тарифы",
      link: "/tariffs",
      active: false,
    },
    {
      name: "FAQ",
      link: "/faq",
      active: false,
    },
  ]);
  const { token } = useSelector((state) => state.user);
  const { usedCompanyCount, companyLimit, status } = useSelector(
    (state) => state.userInfo
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (token) {
      dispatch(fetchUserInfo(token));
    }
  }, [token]);

  return (
    <header className={styles.desktop}>
      <div className={styles.logo}>
        <Link to={"/"}>
          <img src={logo} width={"141px"} />
        </Link>
      </div>
      <Menu
        menu={menu}
        styleUl={{
          padding: "0px",
          width: "33.3%",
        }}
        styleLi={{
          margin: "0px 25px",
        }}
        activeStyle={{
          color: "#029491",
        }}
        hiddenMobile={true}
        setMenu={setMenu}
      />
      {useAuth().isAuth && (
        <>
          <div className={styles.limitsWrapper}>
            <div className={styles.limits}>
              {(status === "loading" && <Loader width={40} />) || (
                <>
                  <div>
                    <span>Использовано компаний</span>{" "}
                    <span className={styles.used}>{usedCompanyCount}</span>
                  </div>
                  <div>
                    <span>Лимит по компаниям</span>{" "}
                    <span className={styles.balance}>{companyLimit}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      <SignHeader hideMobile={true} />
      <Hamburger menu={menu} setMenu={setMenu} />
    </header>
  );
}

export default Header;
