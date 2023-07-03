"use client"
import Cards from "./cards"
import {useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { cardQueue, checkCard} from "./gameplay";



export default function Play(){
    const cards = useSelector(state => state.gameSession)
    const cardQueueList = cardQueue(cards)
    const handleClick = () => {
        
    }
    return (

        <div>

            <Cards cards={cards} ></Cards>

            
        </div>
    )
}