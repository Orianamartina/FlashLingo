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
    const handleClick = (answer, time) => {
        const points = checkCard(cards[index], answer, time)
        //If it's not the first time that the word appears, then we just add the points to the current points.
        const cardAlreadyPlayed = cardsPlayed.find(card => card.word === cards[index].word)
        if (cardAlreadyPlayed){
            let card = cardAlreadyPlayed
            card.points = card.points + points
            setCardsPlayed([...cardsPlayed, card])
        }else{
            //if the user did not go through this word yet, then we push it into the array
            const newCard = cards[index]
            newCard.points = newCard.points + points
            setCardsPlayed([...cardsPlayed, newCard])
        }
        //get a new word
        console.log(cardsPlayed)
        setIndex(index + 1)
     

    }
    return (
        <div>
            {cards?(
                <div>

                 <Cards card={cards[index]} handleClick={handleClick}></Cards>

            
                </div>):(redirect('/dashboard'))
            }
        </div>
        
    )
}