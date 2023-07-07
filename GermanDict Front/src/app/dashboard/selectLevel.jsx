import { useState } from "react";
import LevelCard from "./levelCard";
import style from "./styles/levels.module.css"




export default function SelectLevel(props){

   
   
    return (

        <div className={style.levelDashboard}>
            <LevelCard items={items} userId={props.userId}></LevelCard>
        </div>
    )
}