import React from "react";
import style from "./Tariff.module.scss";
import Sections from "../Sections/Sections";
import lamp from "../../assets/images/lamp.svg";
import target from "../../assets/images/target.svg";
import laptop from "../../assets/images/laptop.svg";
import Functions from "../../functions/functions";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";

const tariffs = [
  {
    name: "Beginner",
    forWhom: "Для небольшого исследования",
    img: lamp,
    price: 799,
    oldPrice: 1200,
    priceForMonth: 150,
    includes: [
      "Безлимитная история запросов",
      "Безопасная сделка",
      "Поддержка 24/7",
    ],
    color: "#FFB64F",
  },
  {
    name: "Pro",
    forWhom: "Для HR и фрилансеров",
    img: target,
    price: 1299,
    oldPrice: 2600,
    priceForMonth: 279,
    includes: [
      "Все пункты тарифа Beginner",
      "Экспорт истории",
      "Рекомендации по приоритетам",
    ],
    color: "#7CE3E1",
  },
  {
    name: "Business",
    forWhom: "Для корпоративных клиентов",
    img: laptop,
    price: 2379,
    oldPrice: 3700,
    includes: [
      "Все пункты тарифа Pro",
      "Безлимитное количество запросов",
      "Приоритетная поддержка",
    ],
    color: "#000000",
  },
];

function Tariff() {
  const blockForReplaceColor = React.useRef([]);
  const [currentTariff, setCurrentTariff] = React.useState(null);
  const { isAuth } = useAuth();

  React.useEffect(() => {
    isAuth ? setCurrentTariff(0) : setCurrentTariff(null);
  }, [isAuth]);

  React.useEffect(() => {
    Functions.getIsDarkness(tariffs[2].color);

    blockForReplaceColor.current.forEach((item, i) => {
      item.style.color = Functions.getIsDarkness(tariffs[i].color)
        ? "white"
        : "black";
    });
  });

  return (
    <Sections title={"наши тарифы"}>
      <div className={style.wrapper}>
        {tariffs.map((item, i) => (
          <div
            key={i.toString()}
            id={"tariff"}
            style={{
              border: currentTariff === i && `2px solid ${item.color}`,
            }}
            className={style.tariff}
          >
            <div
              ref={(el) => (blockForReplaceColor.current[i] = el)}
              style={{ background: item.color }}
              className={style.topWrapper}
            >
              <div className={style.title}>
                <h3>{item.name}</h3>
                <span>{item.forWhom}</span>
              </div>
              <img src={item.img} />
            </div>
            <div className={style.bottomWrapper}>
              <div className={style.contentWrapper}>
                <div className={style.currentTariff}>
                  {currentTariff === i ? <div>Текущий тариф</div> : ""}
                </div>
                <div className={style.priceWrapper}>
                  <span className={style.price}>
                    {item.price.toLocaleString("RU-ru")} ₽{" "}
                  </span>
                  <span className={style.oldPrice}>
                    {item.oldPrice.toLocaleString("RU-ru")} ₽
                  </span>
                </div>
                <div className={style.forWhom}>
                  {item.priceForMonth
                    ? `или ${item.priceForMonth.toLocaleString(
                        "RU-ru"
                      )} ₽/мес. при
                    рассрочке на 24 мес.`
                    : ""}
                </div>
                <div className={style.listWrapper}>
                  <span>В тариф входит</span>
                  <ul>
                    {item.includes.map((inc, i) => (
                      <li key={i}>{inc}</li>
                    ))}
                  </ul>
                </div>
                {currentTariff === i ? (
                  <Button
                    backgroundColor={"#D2D2D2"}
                    name={"Перейти в личный кабинет"}
                  />
                ) : (
                  <Button name={"Подробнее"} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*</ScrollableAnchor>*/}
    </Sections>
  );
}

export default Tariff;
