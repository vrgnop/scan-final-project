import React, { useEffect, useState } from "react";
import style from "./Slider.module.scss";
import classNames from "classnames";
import timer from "../../assets/images/timer.svg";
import loop from "../../assets/images/loop.svg";
import safe from "../../assets/images/safe.svg";
import Sections from "../Sections/Sections";
import ArrowButton from "../ArrowButton/ArrowButton";
import manModels from "../../assets/images/ManModels.svg";
import ImageVisual from "../ImageVisual/ImageVisual";

const sliderData = [
  {
    description: "Высокая и оперативная скорость обработки заявки",
    img: timer,
  },
  {
    description:
      "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
    img: loop,
  },
  {
    description:
      "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    img: safe,
  },
  {
    description:
      "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    img: safe,
  },
  {
    description:
      "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
    img: safe,
  },
];

let visibleSlides = 3; //

function Slider() {
  const [transform, setTransform] = useState(0);
  const [count, setCount] = useState(0);
  const [windowWidth, setWindow] = useState(0);
  const wrapperSlider = React.useRef();
  const slides = React.useRef([]);

  useEffect(() => {
    const paddingWrapper =
      parseInt(getComputedStyle(wrapperSlider.current, true).paddingLeft) * 2;
    const paddingSlide =
      parseInt(getComputedStyle(slides.current[0], true).paddingLeft) * 2;
    const widthSlide =
      (wrapperSlider.current.offsetWidth - paddingWrapper) / visibleSlides;
    slides.current.forEach((item) => {
      item.style.width = `${widthSlide - paddingWrapper - paddingSlide}px`;
    });
    setTransform(-widthSlide * count);
  }, [windowWidth]);

  useEffect(() => {
    visibleSlides = window.innerWidth < 800 ? 1 : 3;
    const setWindowFunc = () => {
      setWindow(window.innerWidth);
    };
    window.addEventListener("resize", () => {
      setWindowFunc();
    });
    return () => {
      setWindowFunc();
    };
  });

  const rightSlider = () => {
    if (count < sliderData.length - visibleSlides) {
      setTransform(
        transform -
          slides.current[0].offsetWidth -
          parseInt(getComputedStyle(slides.current[0], true).marginLeft) * 2
      );
      setCount(count + 1);
    }
  };

  const leftSlider = () => {
    if (count !== 0) {
      setTransform(
        transform +
          slides.current[0].offsetWidth +
          parseInt(getComputedStyle(slides.current[0], true).marginLeft) * 2
      );
      setCount(count - 1);
    }
  };

  return (
    <Sections title={"Почему именно мы"}>
      <div className={style.slider}>
        <ArrowButton
          onClick={leftSlider}
          disabled={count === 0}
          direction={"left"}
          absolutePos={true}
        />
        <div ref={wrapperSlider} className={style.carouselWrapper}>
          <div
            style={{ transform: `translate(${transform}px, 0px)` }}
            className={style.slides}
          >
            {sliderData.map((item, i) => {
              return (
                <div
                  style={{
                    opacity: `${
                      count + visibleSlides === i || count - 1 === i ? 0 : 1
                    }`,
                  }}
                  key={i}
                  ref={(el) => (slides.current[i] = el)}
                  className={style.slide}
                >
                  <div>
                    <div className={style.imgWrapper}>
                      <img src={item.img}></img>
                    </div>
                    <div className={style.textWrapper}>
                      <span>{item.description}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ArrowButton
          onClick={rightSlider}
          disabled={count === sliderData.length - visibleSlides}
          direction={"right"}
          absolutePos={true}
        />
      </div>
      <ImageVisual link={manModels} widthMob={"200%"} widthDesk={"100%"} />
    </Sections>
  );
}

export default Slider;
