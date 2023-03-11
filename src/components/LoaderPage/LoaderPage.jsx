import React, { useState } from "react";
import Loader from "../Loader/Loader";

function LoaderPage({ children }) {
  const [loader, setLoader] = useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      {
        setLoader(false);
      }
    }, 2000);
    setLoader(true);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (loader) {
    return <Loader title={"Загружаем данные..."} type={"block"} />;
  }
  // setLoader(false)
  return children;
}

export default LoaderPage;
