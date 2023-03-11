import React from "react";
import style from "./MainBlock.module.scss";
import heroImg from "../../assets/images/HeroImage.png";
import { useNavigate } from "react-router-dom";
import ImageVisual from "../ImageVisual/ImageVisual";
import Button from "../Button/Button";
import Globals from "../../globals/globals";

function MainBlock() {
  const navigate = useNavigate();
  return (
    <section className={style.wrapperMain}>
      <div className={style.leftSight}>
        <h1>сервис по поиску публикаций о компании по его ИНН</h1>
        <p>
          Комплексный анализ публикаций, получение данных в формате PDF на
          электронную почту.
        </p>
        <div>
          <Button
            onClick={() => navigate("request")}
            type={"purple"}
            name={"Запросить данные"}
          />
        </div>
      </div>
      <ImageVisual
        link={heroImg}
        widthBlockMob={"100%"}
        widthBlockDesc={"60%"}
        widthMob={"100%"}
        widthDesk={"100%"}
      />
    </section>
  );
}

export default MainBlock;
