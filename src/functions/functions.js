const Functions = {
  //Скрытие компонента при клике на другую область
  hideComponentClick(comp, func, action) {
    const onClickHideMenu = (e) => {
      console.log("консоль");
      if (!e.composedPath().includes(comp)) {
        func(false);
      }
    };
    document.body.addEventListener("click", onClickHideMenu);
    return () => document.body.removeEventListener("click", onClickHideMenu);
  },

  //Скрытие компонента при нажатии на другую область
  hideComponentMouseDown(comp, func) {
    const onMouseDownHideMenu = (e) => {
      if (!e.path.includes(comp)) {
        func(false);
      }
    };
    document.body.addEventListener("mousedown", onMouseDownHideMenu);
    return () =>
      document.body.removeEventListener("mousedown", onMouseDownHideMenu);
  },

  //Иименение высоты TextArea при заполнении/удалении текста
  changeHeightTextArea(element, minusPX) {
    element.style.height = "auto";
    element.style.height = element.scrollHeight - minusPX + "px";
  },

  //Сохранение изменений в Local Storage
  saveLocaleStorage(items) {
    localStorage.setItem("localRemember", "true");
    localStorage.setItem(
      "items",
      localStorage.getItem("localRemember") ? JSON.stringify(items) : ""
    );
    console.log(localStorage.getItem("items"));
  },

  getIsDarkness(color) {
    if (color.includes("rgb")) {
      color = color.replace(/[^+\d,]/g, "").split(",");
      const red = color[0];
      const green = color[1];
      const blue = color[2];
      const brightness = (red * 299 + green * 587 + blue * 114) / 1000;
      console.log(brightness);
      return brightness < 150; // Темный цвет?
    }
    const red = parseInt(color.slice(1, 3), 16);
    const green = parseInt(color.slice(3, 5), 16);
    const blue = parseInt(color.slice(5, 7), 16);

    const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

    return brightness < 100; // Темный цвет?
  },
};

export default Functions;
