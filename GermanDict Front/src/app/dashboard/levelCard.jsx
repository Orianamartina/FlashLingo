"use client"

import { useRouter } from 'next/navigation';
import { getLevel } from "@/redux/actions";
import { useState } from 'react';
import {useDispatch} from "react-redux";
import style from "./styles/levels.module.css"


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

        <div>
            <button onClick={handleLevelDown}>{"<<"}</button>
            <button className={style.levelButton} onClick={() => handleLevelClick(index)}>{index}</button>
            <button onClick={handleLevelUp}>{">>"}</button>
            
            
        </div>
    )
}