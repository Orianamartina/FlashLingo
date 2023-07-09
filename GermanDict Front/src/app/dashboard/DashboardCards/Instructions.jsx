import style from "../styles/dashboard.module.css"




export function Instructions(){



    return(
        <div className={style.howToContainer}>
            <h1 className={style.question}>?</h1>
            <h1 className={style.howto}>How to play</h1>
        </div>
    )
}