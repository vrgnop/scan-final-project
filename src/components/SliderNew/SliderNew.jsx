import React, { useEffect, useState } from "react";
import style from "./SliderNew.module.scss";
import Sections from "../Sections/Sections";
import ArrowButton from "../ArrowButton/ArrowButton";
import Loader from "../Loader/Loader";
import classNames from "classnames";

function SliderNew({ sliderData, visibleSlides, status }) {
  const [transform, setTransform] = useState(0);
  const [count, setCount] = useState(0);
  const [windowWidth, setWindow] = useState(0);
  const wrapperSlider = React.useRef();
  const slides = React.useRef([]);
  const [width, setWidth] = React.useState(0);
  const staticBlock = React.useRef();

  useEffect(() => {
    const widthStatic =
      window.screen.width <= 800 ? 0 : staticBlock.current.offsetWidth;
    if (status === "success") {
      const paddingWrapper =
        parseInt(getComputedStyle(wrapperSlider.current, true).paddingLeft) * 2;
      const paddingSlide =
        parseInt(getComputedStyle(slides.current[0], true).paddingLeft) * 2;
      const widthSlide =
        (wrapperSlider.current.offsetWidth - paddingWrapper - widthStatic) /
        visibleSlides;
      slides.current.forEach((item) => {
        item.style.width = `${widthSlide - paddingWrapper - paddingSlide}px`;
      });
      setWidth(widthSlide);
    }
  }, [windowWidth, status]);

  useEffect(() => {
    if (status === "success") {
      const setWindowFunc = () => {
        setWindow(window.innerWidth);
      };
      window.addEventListener("resize", () => {
        setWindowFunc();
      });
      return () => {
        setWindowFunc();
      };
    }
  });

  const rightSlider = () => {
    if (count < sliderData.length - visibleSlides) {
      setTransform(
        transform -
          slides.current[0].getBoundingClientRect().width -
          parseInt(getComputedStyle(slides.current[0], true).marginLeft) * 2
      );
      setCount(count + 1);
    }
  };

  const leftSlider = () => {
    if (count !== 0) {
      setTransform(
        transform +
          slides.current[0].getBoundingClientRect().width +
          parseInt(getComputedStyle(slides.current[0], true).marginLeft) * 2
      );
      setCount(count - 1);
    }
  };

  return (
    <div className={style.slider}>
      <ArrowButton
        onClick={leftSlider}
        disabled={count === 0}
        direction={"left"}
      />
      <div ref={wrapperSlider} className={style.carouselWrapper}>
        <div ref={staticBlock} className={style.total}>
          <span>Период</span>
          <span>Всего</span>
          <span>Риски</span>
        </div>
        <div
          style={{ transform: `translate(${transform}px, 0px)` }}
          className={classNames(
            style.slides,
            status === "loading" && style.loading
          )}
        >
          {(status === "success" &&
            sliderData.map((item, i) => {
              const date = new Date(item.date);
              return (
                <div
                  className={style.slide}
                  ref={(el) => (slides.current[i] = el)}
                  key={item.date}
                >
                  <div className={style.dateWrapper}>
                    <span>
                      {date.toLocaleDateString().split("/").join(".")}
                    </span>
                    <span>{item.totalDocuments}</span>
                    <span>{item.riskFactors}</span>
                  </div>
                  <div className={style.line}></div>
                </div>
              );
            })) || (
            <Loader title={visibleSlides === 1 ? "" : "Идет загрузка"} />
          )}
        </div>
      </div>
      <ArrowButton
        onClick={rightSlider}
        disabled={
          sliderData === null ||
          count === sliderData.length - visibleSlides ||
          sliderData.length < visibleSlides
        }
        direction={"right"}
      />
    </div>
  );
}

export default SliderNew;
