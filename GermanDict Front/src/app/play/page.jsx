"use client"
import Cards from "./cards"
import {useSelector} from "react-redux";
import {useState } from "react";
import {  checkCard, endSession} from "../utils/gameplay";
import SessionStats from "./sessionStats";
import axios from "axios";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import style from "./play.module.css"
import Image from "next/image";
import logo from "../../../public/logo.png"

export default function Play(){
    const  user = JSON.parse(localStorage.getItem("user"));
    const {push} = useRouter()
    const cards = useSelector(state => state.gameSession)
    const id = useSelector(state => state.sessionId)
    const [cardsPlayed, setCardsPlayed] = useState([])
    const [index, setIndex] = useState(0)
    const [finished, setFinished] = useState(false)
    const [translation, setTranslation] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [answerStatus, setAnswerStatus] = useState()


    const handleClick = (answer, time) => {
        let card = cards[index]
        const points = checkCard(card, answer, time)
        const newCard = cards[index]
        newCard.points = points
        setCardsPlayed([...cardsPlayed, newCard ])
        setTranslation([card.translation1, card.translation2, card.translation3])
        setSubmitted(true)
        if(points === 1){
            setAnswerStatus("green")
        }
        if(points ===-1){
            setAnswerStatus("red")
        }
        if(points === 0){
            setAnswerStatus("yellow")
        }
      
    }
   
 
    const nextWord = () => {
        if (index < cards.length -1 && submitted){
            setIndex(index + 1)
            setSubmitted(false)
            setAnswerStatus("neutral")
        }
        if(index === cards.length -1 && submitted){  
            setFinished(true)
            setSubmitted(false)
            endCurrentSession()
        }
        setTranslation([])

    }
    const [redCardsEnd, setRedCardsEnd] = useState()
    const [yellowCardsEnd, setYellowCardsEnd] = useState()
    const [greenCardsEnd, setGreenCardsEnd] = useState()

    const endCurrentSession =async() =>{
        try { 
            let sessionCards = endSession(cardsPlayed)
            setGreenCardsEnd(sessionCards.green_cards)
            setYellowCardsEnd(sessionCards.yellow_cards)
            setRedCardsEnd(sessionCards.red_cards)
            const token = await axios.get(`http://127.0.0.1:8000/csrf_token/`, {withCredentials:true})
            const csrf = token.data.csrf_token
            const saveSession = await axios.post("http://localhost:3000/api/saveSession",{sessionId: id, body: sessionCards, token: csrf, userId: user.id})
            if (saveSession.status === 200) {
                push('/dashboard')
            }
        } catch (error) {
        
        }
        
    }
    let card = cards[index]
    return (
        <div >
            
            {finished?(<div><h1>Saving results</h1>
                        {() => endCurrentSession}
                        <SessionStats yellow_cards={yellowCardsEnd} green_cards ={greenCardsEnd} red_cards={redCardsEnd}></SessionStats> </div>):(
                <div className={style.container}>
                    
                  
                    <Link href={"/dashboard"}><Image className={style.logo} src={logo} alt="logo"/></Link>
                       
                    <Cards
                        card={card} 
                        handleClick={handleClick} 
                        next={nextWord} 
                        submitted={submitted} 
                        answerStatus ={answerStatus}>
                        
                    </Cards>

                </div>)}
           
        </div>
        
    )
}