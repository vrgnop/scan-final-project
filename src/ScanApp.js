import React from "react";
import "./SCSS/index.scss";
import Main from "./pages/Main/Main";
import { Route, Routes } from "react-router-dom";
import Authorization from "./pages/Authorization/Authorization";
import SignIn from "./pages/Authorization/SignIn/SignIn";
import SignUp from "./pages/Authorization/SignUp/SignUp";
import SearchObjects from "./pages/SearchObjects/SearchObjects";
import RequireAuth from "./hoc/RequireAuth";
import { getStorageUser } from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";
import LoaderPage from "./components/LoaderPage/LoaderPage";
import Response from "./pages/Response/Response";
import NotFound from "./components/NotFound/NotFound";
import { useNavigate } from "react-router-dom";
import SliderNew from "./components/SliderNew/SliderNew";
import Tariffs from "./pages/Tariffs/Tariffs";

function ScanApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const main = React.useRef();

  React.useEffect(() => {
    localStorage.getItem("items") !== null && dispatch(getStorageUser());
  }, []);

  return (
    <main ref={main}>
      <LoaderPage>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/tariffs" element={<Tariffs />} />
          <Route
            path={"*"}
            element={
              <NotFound
                title={"Страница не найдена"}
                titleButton={"На главную"}
                onClickButton={() => navigate("/")}
              />
            }
          />
          <Route
            path={"/test"}
            element={<SliderNew status={"loading"} visibleSlides={9} />}
          />
          <Route path={"/authorization/*"} element={<Authorization />}>
            <Route path={"signin"} element={<SignIn />} />
            <Route path={"signup"} element={<SignUp />} />
          </Route>
          {/*Приватные роуты*/}
          <Route
            path={"/request"}
            element={
              <RequireAuth>
                <SearchObjects />
              </RequireAuth>
            }
          />
          <Route
            path={"/response"}
            element={
              <RequireAuth>
                <Response />
              </RequireAuth>
            }
          />
        </Routes>
      </LoaderPage>
    </main>
  );
}

export default ScanApp;
