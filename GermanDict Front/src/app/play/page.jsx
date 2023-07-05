"use client"
import Cards from "./cards"
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { cardQueue, checkCard, formatCards,} from "./gameplay";
import { redirect } from 'next/navigation';
import { endSession } from "./gameplay";
import axios from "axios";


export default function Play(){

    const cards = useSelector(state => state.gameSession)
    const id = useSelector(state => state.sessionId)
    const [cardsPlayed, setCardsPlayed] = useState([])
    const [index, setIndex] = useState(0)
    const [finished, setFinished] = useState(false)
    const [translation, setTranslation] = useState("")
    const handleClick = (answer, time) => {
        let card = cards[index]
        const points = checkCard(card, answer, time)
        const newCard = cards[index]
        newCard.points = points
        setCardsPlayed([...cardsPlayed, newCard ])
        setTranslation([card.translation1, card.translation2, card.translation3])
        //get a new word
       
    }
    const nextWord = () => {
        if (index < cards.length){
            setIndex(index + 1)
        }
        else{
            setFinished(true)
        }
        
    }
   
    
    const saveSession = () =>{
       const response = axios.post(`http://127.0.0.1:8000/game-session/update/${id}/`, endSession(cardsPlayed))
        console.log(response.data)
    }
    return (
        <div>
            <button onClick={saveSession}>End Session</button>
            {cards?(
                <div>

                 <Cards card={cards[index]} handleClick={handleClick} next={nextWord}></Cards>

            
                </div>):(redirect('/dashboard'))
            }{finished? saveSession(): ""}
            
        </div>
        
    )
}