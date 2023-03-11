import React from "react";
import style from "./Footer.module.scss"
import whiteLogo from '../../assets/images/white-logo.svg'

function Footer() {
    return (
        <footer>
            <div>
                <img src={whiteLogo} width={'141px'}/>
            </div>
            <div className={style.leftSight}>
                <address>
                    г. Москва, Цветной б-р, 40<br/>
                    +7 495 771 21 11<br/>
                    info@skan.ru
                </address>
                <p>Copyright. 2022</p>
            </div>
        </footer>
    )
}

export default Footer