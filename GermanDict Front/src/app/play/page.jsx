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
    console.log(cardsPlayed)
    const handleClick = (answer, time) => {
        let card = cards[index]
        const points = checkCard(card, answer, time)
        const newCard = cards[index]
        newCard.points = points
        newCard.time = time
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
        setTranslation([])
        
    }
    const saveSession =async () =>{
        const csrfToken = await axios.get(`http://127.0.0.1:8000/csrf_token/`, {withCredentials: true})
        let token = csrfToken.data.csrf_token
       const response = await axios.post(`http://127.0.0.1:8000/game-session/update/${id}/`, endSession(cardsPlayed), {headers: {

        "Content-Type": "application/json",
        'X-CSRFToken': token,
        withCredentials: true,}})
        console.log(response.data)
   
    
    }
    return (
        <div>
            <button onClick={saveSession}>End Session</button>
            {cards?(
                <div>

                 <Cards card={cards[index]} handleClick={handleClick} next={nextWord} ></Cards>
                 {translation.length? translation.map(translation => <h1>{translation}</h1>): ""}

            
                </div>):(redirect('/dashboard'))
            }{finished? saveSession(): ""}
            
        </div>
        
    )
}