import { useSelector } from "react-redux";

function useAuth() {
  const { login, token } = useSelector((state) => state.user);

  if (
    localStorage.getItem("items") === null ||
    localStorage.getItem("items") === "null"
  ) {
    return {
      isAuth: !!token,
      login,
      token,
    };
  }
  const user = JSON.parse(localStorage.getItem("items"));
  let date = new Date(user.date);
  let now = new Date();
  if (date < now) {
    localStorage.removeItem("items");
  }
  return {
    isAuth: !!user.token,
    login: user.login,
    token: user.token,
    date: user.date,
  };
}

export default useAuth;
