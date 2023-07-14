"use client"

import { useRouter } from 'next/navigation';
import { getLevel } from "@/redux/actions";
import { useState } from 'react';
import {useDispatch} from "react-redux";
import style from "../styles/levels.module.css"
import Image from 'next/image';
import arrow from "../../../../public/arrow-right.png"
export default function LevelCard(props){

    const {push} = useRouter()


    const [index, setIndex] = useState(1)
    const dispatch = useDispatch()
    const handleLevelClick =async (level)  => {
        await dispatch(getLevel(level, props.userId))
        push(`/play`)
    }
    function handleLevelUp(){
        if(index < 10){
            setIndex(index + 1)
        }
    }
    function handleLevelDown(){
        if(index > 1){
            setIndex(index - 1)
        }
    }
    
    return (

        <div className={style.levelDashboard}>
            <h1 className={style.levelText}>Choose a level</h1>
            <div className= {style.levelButtonOptions}>
               
                <Image onClick={handleLevelDown} className={style.arrow1} src={arrow}></Image>
                <h1 className={style.level}>{index}</h1>
                <Image onClick={handleLevelUp} className={style.arrow2} src={arrow}></Image>
            </div>
         
            <button className={style.levelButton} onClick={() => handleLevelClick(index)}>Play</button>
            
            
        </div>
    )
}