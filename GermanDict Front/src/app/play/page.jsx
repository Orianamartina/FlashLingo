"use client"
import Cards from "./cards"
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { cardQueue, checkCard, formatCards,} from "./gameplay";
import { redirect } from 'next/navigation';


export default function Play(){
    const dispatch = useDispatch()
    const cards = useSelector(state => state.gameSession)
 
    const [cardsPlayed, setCardsPlayed] = useState([])
    const [index, setIndex] = useState(0)
    const [finished, setFinished] = useState(false)

    const handleClick = (answer, time) => {
        const points = checkCard(cards[index], answer, time)
        const newCard = cards[index]
        newCard.points = points
        setCardsPlayed([...cardsPlayed, newCard ])
        
        //get a new word
        console.log(cardsPlayed)
        if (index < cards.length){
            setIndex(index + 1)
        }
        else{
            setFinished(true)
        }
       
    }
    const saveSession = () =>{

    }
    return (
        <div>
            <button onClick={saveSession}>End Session</button>
            {cards?(
                <div>

                 <Cards card={cards[index]} handleClick={handleClick}></Cards>

            
                </div>):(redirect('/dashboard'))
            }{finished? saveSession(): ""}
            
        </div>
        
    )
}