"use client"
import Cards from "./cards"
import {useDispatch, useSelector} from "react-redux";
import {useState } from "react";
import {  checkCard, endSession} from "./gameplay";
import { redirect } from 'next/navigation';
import axios from "axios";
import { useRouter } from 'next/router';


export default function Play(){
    const cards = useSelector(state => state.gameSession)
    const id = useSelector(state => state.sessionId)
    console.log(cards)
    const [cardsPlayed, setCardsPlayed] = useState([])
    const [index, setIndex] = useState(0)
    const [finished, setFinished] = useState(false)
    const [translation, setTranslation] = useState("")
    const [submitted, setSubmitted] = useState(false)


    const handleClick = (answer, time) => {
        let card = cards[index]
        const points = checkCard(card, answer, time)
        const newCard = cards[index]
        newCard.points = points
        newCard.time = time
        setCardsPlayed([...cardsPlayed, newCard ])
        setTranslation([card.translation1, card.translation2, card.translation3])
        setSubmitted(!submitted)

    }
   
 
    const nextWord = () => {
        if (index < cards.length -1 && submitted){
            setIndex(index + 1)
        }
        if(index === cards.length -1 && submitted){  
            setFinished(true)
            setSubmitted(!submitted)
            endCurrentSession()
        }
        setTranslation([])
        
    }
    const [error, setError]=useState()
    const endCurrentSession =async() =>{
        try {
            endSession(cardsPlayed)
            const token = await axios.get(`http://127.0.0.1:8000/csrf_token/`, {withCredentials:true})
            const csrf = token.data.csrf_token
            const saveSession = await axios.post("http://localhost:3000/api/saveSession",{sessionId: id, body: cardsPlayed, token: csrf})
            if (saveSession.status === 200) {
                const router = useRouter();
                router.push('/dashboard');
            }
        } catch (error) {
            setError(error)
        }
        
    }
    return (
        <div>
 
            {cards?(
                <div>

                 <Cards card={cards[index]} handleClick={handleClick} next={nextWord} submitted={submitted} setSubmitted={setSubmitted}></Cards>
                 {translation.length? translation.map(translation => <h1>{translation}</h1>): ""}

            
                </div>):(redirect('/dashboard'))
            }
            <h1>{error?error:""}</h1>
            
        </div>
        
    )
}