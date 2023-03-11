import React from "react";
import styles from "./SearchObjects.module.scss";
import document from "../../assets/images/document.svg";
import folder from "../../assets/images/folders.svg";
import menRocket from "../../assets/images/men-rocket.svg";
import Checkbox from "../../components/Checkbox/Checkbox";
import Input from "../../components/Input/Input";
import DropDown from "../../components/DropDown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchObjectSearch,
  setStatus,
} from "../../redux/slices/searchObjectsSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import NotFound from "../../components/NotFound/NotFound";

const tonality = [
  {
    name: "any",
    title: "Любая",
  },
  {
    name: "negative",
    title: "Негативная",
  },
  {
    name: "positive ",
    title: "Позитивная",
  },
];

function SearchObjects() {
  const [inn, setInn] = React.useState("");
  const [innErr, setInnErr] = React.useState({
    title: "",
    isErr: false,
  });
  const [selectTonality, setSelectTonality] = React.useState({
    name: "any",
    title: "Любая",
  });
  const [documentsCount, setDocumentsCount] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [checkboxData, setCheckboxData] = React.useState([
    {
      name: "Признак максимальной полноты",
      isTrue: false,
    },
    {
      name: "Упоминания в бизнес-контексте",
      isTrue: false,
    },
    {
      name: "Главная роль в публикации",
      isTrue: false,
    },
    {
      name: "Публикации только с риск-факторами",
      isTrue: false,
    },
    {
      name: "Включать технические новости рынков",
      isTrue: false,
    },
    {
      name: "Включать анонсы и календари",
      isTrue: false,
    },
    {
      name: "Включать сводки новостей",
      isTrue: false,
    },
  ]);
  const [disabledButton, setDisabledButton] = React.useState(true);
  const [isSearch, setIsSearch] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const { objects, status } = useSelector((state) => state.searchObjects);
  const body = {
    issueDateInterval: {
      startDate: dateStart,
      endDate: dateEnd,
    },
    searchContext: {
      targetSearchEntitiesContext: {
        targetSearchEntities: [
          {
            type: "company",
            sparkId: null,
            entityId: null,
            inn: inn,
            maxFullness: checkboxData[0].isTrue,
            inBusinessNews: checkboxData[1].isTrue,
          },
        ],
        onlyMainRole: checkboxData[2].isTrue,
        tonality: selectTonality.name,
        onlyWithRiskFactors: checkboxData[3].isTrue,
        riskFactors: {
          and: [],
          or: [],
          not: [],
        },
        themes: {
          and: [],
          or: [],
          not: [],
        },
      },
      themesFilter: {
        and: [],
        or: [],
        not: [],
      },
    },
    searchArea: {
      includedSources: [],
      excludedSources: [],
      includedSourceGroups: [],
      excludedSourceGroups: [],
    },
    attributeFilters: {
      excludeTechNews: !checkboxData[4].isTrue,
      excludeAnnouncements: !checkboxData[5].isTrue,
      excludeDigests: !checkboxData[6].isTrue,
    },
    similarMode: "duplicates",
    limit: +documentsCount,
    sortType: "sourceInfluence",
    sortDirectionType: "desc",
    intervalType: "day",
    histogramTypes: ["totalDocuments", "riskFactors"],
  };

  React.useEffect(() => {
    if (
      inn !== "" &&
      documentsCount !== "" &&
      dateStart !== "" &&
      dateEnd !== "" &&
      !innErr.isErr
    ) {
      setDisabledButton(false);
    } else setDisabledButton(true);
  }, [inn, innErr, documentsCount, dateStart, dateEnd]);

  React.useEffect(() => {
    if (objects != null && objects.length !== 0) {
      navigate("/response");
    } else if (objects != null) setIsSearch(true);
  }, [objects]);

  let now = new Date().toISOString().split("T")[0];

  const onClickCheckbox = (i) => {
    const newData = checkboxData.map((item, y) => {
      item.isTrue = i === y ? !item.isTrue : item.isTrue;
      return item;
    });
    setCheckboxData(newData);
  };

  const onChangeInn = (e) => {
    e.target.value = e.target.value.trim();
    const numbers = e.target.value.replace(/\D/g, "");
    if (e.target.value.length <= 10) {
      setInn(numbers);
    }
    if (e.target.value.length === 10) {
      setInnErr({
        title: "",
        isErr: false,
      });
    }
    if (e.target.value.slice(0, 2) === "00") {
      setInnErr({
        title: "Инн не может начинаться с 00",
        isErr: true,
      });
    } else if (innErr.title === "Инн не может начинаться с 00") {
      setInnErr({
        title: "",
        isErr: false,
      });
    }
  };

  const onChangeDocumentsCount = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if ((value <= 1000 && value >= 1) || value.length === 0) {
      setDocumentsCount(value);
    }
  };

  const onChangeTonality = (e) => {
    tonality.forEach((item) => {
      if (item.title === e.target.value) {
        setSelectTonality(item);
      }
    });
  };

  const onClickSendRequest = () => {
    dispatch(fetchObjectSearch({ token, body }));
  };

  if (status === "loading") {
    return <Loader type={"block"} title={"Загружаем данные..."} />;
  }

  if (isSearch) {
    return (
      <NotFound
        title={"По вашему запросу ничего не нашлось"}
        titleButton={"Изменить запрос"}
        onClickButton={() => {
          navigate("/request");
          setIsSearch(false);
        }}
      />
    );
  }

  if (status === "error") {
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
    <section className={styles.wrapper}>
      <div className={styles.leftWrapper}>
        <div className={styles.title}>
          <div>
            <h1>Найдите необходимые данные в пару кликов.</h1>
            <p>
              Задайте параметры поиска. <br />
              Чем больше заполните, тем точнее поиск
            </p>
          </div>
          <div className={styles.topPicturesMob}>
            <img src={document} />
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.topForm}>
            <div className={styles.leftForm}>
              <div className={styles.inputWrapper}>
                <Input
                  label={"Инн компании*"}
                  value={inn}
                  isRequired={true}
                  type={"text"}
                  onBlur={() =>
                    inn.length < 10
                      ? setInnErr({
                          title: "ИНН должен состоять из 10 цифр",
                          isErr: true,
                        })
                      : !innErr
                      ? setInnErr({
                          title: "",
                          isErr: false,
                        })
                      : ""
                  }
                  onChange={onChangeInn}
                  err={innErr.isErr}
                  messageErr={innErr.title}
                  placeholder={"10 цифр"}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label>Тональность</label>
                <DropDown
                  items={tonality}
                  keys={"title"}
                  selectItem={selectTonality.title}
                  onClick={onChangeTonality}
                ></DropDown>
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  label={"Количество документов в выдаче*"}
                  value={documentsCount}
                  isRequired={true}
                  type={"text"}
                  onChange={(e) => onChangeDocumentsCount(e)}
                  placeholder={"от 1 до 1000"}
                />
              </div>
            </div>
            <div className={styles.rightForm}>
              <div className={styles.checkboxes}>
                {checkboxData.map((item, i) => {
                  return (
                    <Checkbox
                      key={i}
                      title={item.name}
                      check={item.isTrue}
                      index={i}
                      onCLick={onClickCheckbox}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.bottomForm}>
            <div>
              <label>Диапазон поиска*</label>
              <div>
                <input
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  type={"date"}
                  max={now}
                />
                <input
                  placeholder={""}
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  type={"date"}
                  max={now}
                  min={dateStart}
                  disabled={(dateStart === "" && true) || false}
                />
              </div>
            </div>
            <div className={styles.button}>
              <input
                disabled={disabledButton}
                value={"Поиск"}
                type={"submit"}
                onClick={onClickSendRequest}
              />
              <span>* Обязательные к заполнению поля</span>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.rightWrapper}>
        <div className={styles.topPicturesDesc}>
          <img src={document} />
          <img src={folder} />
        </div>
        <div className={styles.bottomPictures}>
          <img src={menRocket} />
        </div>
      </div>
    </section>
  );
}

export default SearchObjects;
