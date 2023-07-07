import { useState } from "react";
import LevelCard from "./levelCard";
import style from "./styles/levels.module.css"




export default function SelectLevel(props){

   
   
    return (

        <div className={style.levelDashboard}>
            <h1 className={style.levelText}>Choose a level</h1>
            <LevelCard  userId={props.userId}></LevelCard>
        </div>
    )
}