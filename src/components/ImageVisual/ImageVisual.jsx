import React from "react";
import style from "./ImageVisual.module.scss";

function ImageVisual({
  link,
  widthDesk,
  widthMob,
  widthBlockDesc,
  widthBlockMob,
}) {
  return (
    <>
      <div style={{ width: widthBlockDesc }} className={style.wrapperDesc}>
        <img className={style.desktop} width={widthDesk} src={link} />
      </div>
      <div style={{ width: widthBlockMob }} className={style.wrapperMob}>
        <img className={style.mobile} width={widthMob} src={link} />
      </div>
    </>
  );
}

export default ImageVisual;
