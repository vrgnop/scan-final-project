import React from "react";
import style from "./Main.module.scss";
import MainBlock from "../../components/MainBlock/MainBlock";
import Slider from "../../components/Slider/Slider";
import Tariff from "../../components/Tariff/Tariff";

function Main() {
  return (
    <>
      <MainBlock />
      <Slider />
      <Tariff />
    </>
  );
}

export default Main;
