import React from "react";
import styles from './Placeholder.module.scss'
import {useLocation, useNavigate} from "react-router-dom";
import classNames from "classnames";

function Placeholder ({children}) {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <button onClick={() => navigate('signin')}
                        className={classNames(styles.authorization, location.pathname.includes('signin') ? styles.active : '')}>
                    Войти</button>
                <button onClick={() => navigate('signup')}
                        className={classNames(styles.registration, location.pathname.includes('signup') ? styles.active : '')}>
                    Зарегистрироваться</button>
            </div>
            <div className={styles.form}>
                {children}
            </div>
        </div>
    )
}

export default Placeholder