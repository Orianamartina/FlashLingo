"use client"
import Cards from "./cards"
import {useSelector} from "react-redux";
import { useEffect, useState } from "react";




export default function Play(){

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const gameSession = useSelector((state) => state.gameSession);
    
    
    const [currentSession, setCurrentSession] = useState({
        green_cards: [],
        yellow_cards: [],
        red_cards: [],
        unclassified_cards:[]
    });
    
    const [redCards, setRedCards] = useState(gameSession.red_cards);
    const [yellowCards, setYellowCards] = useState(gameSession.yellow_cards); 
    const [greenCards, setGreenCards] = useState(gameSession.green_cards);
    const [unclassifiedCards, setUnclassifiedCards] = useState(gameSession.unclassified_cards);

    const startingRedCards = redCards
    const startingYellowCards = yellowCards
    const startingGreenCards = greenCards
    const startingUnclassifiedCards = unclassifiedCards

    const totalCards = [...startingRedCards, ...startingRedCards, ...startingRedCards, ...startingYellowCards, ...startingYellowCards, ...startingGreenCards, ...startingUnclassifiedCards]

    const cardQueue = shuffleArray(totalCards)

    
    const [hola, setHola] = useState()
    const [flag, setFlag] = useState()
    const [guessTime, setGuessTime] = useState()


    /*  

    
    
    
    
    */
    function handleClick(answer){
        if( answer == cardQueue[0].translation1 ||  answer == cardQueue[0].translation2 ||  answer == cardQueue[0].translation3){
            if (cardQueue[0] in greenCards){
                setCurrentSession(prevState => ({
                    ...prevState,
                    [green_cards]: [...prevState[green_cards], cardQueue[0]]
                }));
            };
            if (cardQueue[0] in redCards){
                if (cardQueue[0] in currentSession.red_cards){
                        
                } 
                else{

                }                   
            }
            
        }
        
        else{
            setHola("bad")
        }
    
    }

   
    return (

        <div>

            <Cards handleClick={handleClick} cardQueue={cardQueue} hola={hola}></Cards>

            
        </div>
    )
}