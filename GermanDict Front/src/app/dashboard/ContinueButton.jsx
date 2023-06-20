"use client";

import { getLevel } from "@/redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";


export default function ContinueButton(){

    const dispatch = useDispatch()
    const gameSession = useSelector((state) => state.gameSession)

    useEffect(() => { 
        dispatch(getLevel(2, 1))
         
    }, [dispatch])

    const handleClick = async () => {

       console.log(gameSession)
    }



    
    return (

        <div>

            <button onClick={handleClick}>continue</button>

            
        </div>
    )
}