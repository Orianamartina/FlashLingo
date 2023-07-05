"use client"
import { getLevel } from "@/redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";


export default function Cards(props){
   
    const [answer, setAnswer] = useState()
    const [startTime, setStartTime] = useState()
    function handleInputChange(e){
        setAnswer(e.target.value)
    }
    useEffect(() => {
        // Add event listeners when component mounts
        const handleKeyPressWithAnswer = (event) => handleKeyPress(event, answer, setAnswer);
        window.addEventListener('keydown', handleKeyPressWithAnswer);
        setStartTime(new Date().getTime());
        
        // Clean up event listeners when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPressWithAnswer);
            };
    }, [answer, setAnswer]);


    const handleKeyPress = (event, answer, setAnswer) => {
        if (event.key === 'Enter') {
            const endTime = new Date().getTime();
            const elapsedTimeInSeconds = Math.floor((endTime - startTime) / 1000);
            props.handleClick(answer, elapsedTimeInSeconds);
            setAnswer("")
        } else if (event.key === 'ArrowRight') {
            // Action when Right Arrow key is pressed
            props.next()
        }
    };
    
    return (   

        <div>

            <h1>{props.card.word? props.card.word: redirect("/dashboard")}</h1>
            <input type="text" value={answer} onChange={(e) => handleInputChange(e)}/>
            <button onClick={() =>{
                const endTime = new Date().getTime();
                const elapsedTimeInSeconds = Math.floor((endTime - startTime) / 1000);
                props.handleClick(answer, elapsedTimeInSeconds);
                setAnswer('');
            }}>Check</button>
            <button onClick={props.next}>next</button>
            <h1>{answer}</h1>
            <h1>{Math.floor((new Date().getTime() - startTime) / 1000)}</h1>
            
        </div>
    )
}