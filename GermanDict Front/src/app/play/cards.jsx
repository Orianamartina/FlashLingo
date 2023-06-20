"use client"

import {useSelector} from "react-redux";
import { useState } from "react";
export default function Cards(){

    const gameSession = useSelector((state) => state.gameSession)
    
    const [currentSession, setCurrentSession] = useState()

    console.log(gameSession)
    return (

        <div>

            <h1>holaaa</h1>

            
        </div>
    )
}