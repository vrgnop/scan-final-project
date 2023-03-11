import React from "react";
import MainSection from "../../components/MainSection/MainSection";
import womanSearchImg from "../../assets/images/woman-search.svg";
import { useSelector, useDispatch } from "react-redux";
import { fetchObjectHistograms } from "../../redux/slices/oblectsHistogramSlice";
import styles from "./Response.module.scss";
import SliderNew from "../../components/SliderNew/SliderNew";
import Sections from "../../components/Sections/Sections";
import { fetchDocumentList } from "../../redux/slices/documentListSlice";
import replaceImg from "../../assets/images/replace-img-document.jpg";
import Image from "../../components/Image/Image";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";
import { setStatus } from "../../redux/slices/searchObjectsSlice";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/Skeleton/Skeleton";
import Button from "../../components/Button/Button";
import globals from "../../globals/globals";

function Response() {
  const [isShowMore, setIsShowMore] = React.useState(true);
  const { bodyRequest, objects } = useSelector((state) => state.searchObjects);
  const [visibleSlides, setVisibleSlides] = React.useState(0);
  const { documents, statusDocuments } = useSelector(
    (state) => state.documentList
  );
  const { token } = useSelector((state) => state.user);
  const { histograms, status, total } = useSelector(
    (state) => state.objectHistogram
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (objects) {
      console.log(1);
      const bodyRequestDocument = {
        ids: [],
      };
      dispatch(
        fetchObjectHistograms({
          token: token,
          bodyRequest: bodyRequest,
        })
      );
      objects
        .slice(0, 2)
        .forEach((item) => bodyRequestDocument.ids.push(item.encodedId));
      documents.length === 0 &&
        dispatch(
          fetchDocumentList({
            token: token,
            bodyRequest: bodyRequestDocument,
          })
        );
    }
  }, []);

  React.useState(() => {
    setVisibleSlides(window.screen.width < 800 ? 1 : 7);
    console.log(window.innerWidth, visibleSlides);
  });

  React.useEffect(() => {
    if (objects && documents) {
      documents.length === objects.length && setIsShowMore(false);
    }
  }, [documents]);

  const onClickShowMoreDocuments = () => {
    const bodyRequestDocument = {
      ids: [],
    };
    objects
      .slice(documents.length, documents.length + 2)
      .forEach((item) => bodyRequestDocument.ids.push(item.encodedId));
    dispatch(
      fetchDocumentList({
        token: token,
        bodyRequest: bodyRequestDocument,
      })
    );
  };

  if (statusDocuments === "error" || !statusDocuments) {
    return (
      <NotFound
        title={"Технические проблемы с сервером повторите попытку позже"}
        titleButton={"На главную"}
        onClickButton={() => {
          navigate("/");
          dispatch(setStatus());
        }}
      />
    );
  }

  return (
    <>
      <MainSection
        title={"Ищем. Скоро будут результаты"}
        description={
          "Поиск может занять некоторое время, просим сохранять терпение."
        }
        image={womanSearchImg}
      />
      <Sections
        title={"Общая сводка"}
        description={
          status === "success" ? `Найдено ${total} вариантов` : "Идет посдчет"
        }
      >
        <SliderNew
          sliderData={histograms}
          visibleSlides={visibleSlides}
          status={status}
        />
      </Sections>
      <Sections title={"Список документов"}>
        <div className={styles.documents}>
          {documents.map((item, i) => {
            const date = new Date(item.date);
            return (
              <div className={styles.document} key={i}>
                <div className={styles.topWrapper}>
                  <div className={styles.dateSource}>
                    <span>
                      {date.toLocaleDateString().split("/").join(".")}
                    </span>{" "}
                    <a href={item.link}>{item.source}</a>
                  </div>
                  <h4>{item.title}</h4>
                  {item.attributes
                    .filter((item) => item.isShow)
                    .map((item) => (
                      <div>{item.name}</div>
                    ))}
                  <div className={styles.img}>
                    <Image img={item.image ? item.image : replaceImg} />
                  </div>
                  <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  />
                </div>
                <div className={styles.bottomWrapper}>
                  <Button
                    name={"Читать в источнике"}
                    backgroundColor={globals.LightTurquoise}
                  />
                  <span>{item.countWord} слова</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.buttonWrapper}>
          {statusDocuments === "loading" ? (
            <Loader title={"Загрузка..."} />
          ) : (
            isShowMore && (
              <button
                onClick={onClickShowMoreDocuments}
                className={styles.button}
              >
                Показать больше
              </button>
            )
          )}
        </div>
      </Sections>
    </>
  );
}

export default Response;
