import "./App.css";
import ScanApp from "./ScanApp";
import Header from "./layouts/Header/Header";
import React from "react";
import Footer from "./layouts/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <ScanApp />
      <Footer />
    </>
  );
}

export default App;
