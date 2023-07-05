"use client"
import { getLevel } from "@/redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";


export default function Cards(props){
   
    const [answer, setAnswer] = useState()

    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0)

    function handleInputChange(e){
        setAnswer(e.target.value)
    }
    useEffect(() => {
        // Add event listeners when component mounts
        const handleKeyPressWithAnswer = (event) => handleKeyPress(event, answer, setAnswer);
        window.addEventListener('keydown', handleKeyPressWithAnswer);
        setStartTime(new Date().getTime());

        // Update the elapsed time every requestAnimationFrame
        const updateElapsedTime = () => {
            const currentTime = new Date().getTime();
            const elapsed = currentTime - startTime;
            setElapsedTime(elapsed);
            requestAnimationFrame(updateElapsedTime);
        };
        requestAnimationFrame(updateElapsedTime);
        
        // Clean up event listeners when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPressWithAnswer);
            setStartTime(null);
             setElapsedTime(0);
            };
    }, [answer, setAnswer]);
    const formatTime = (time) => {
        const seconds = Math.floor(time / 1000);
        const milliseconds = (time % 1000).toString().padStart(3, '0');
        return `${seconds}.${milliseconds}`;
      };


    const handleKeyPress = (event, answer, setAnswer) => {
        if (event.key === 'Enter') {
            const endTime = new Date().getTime();
            const elapsedTimeInSeconds = (endTime - startTime) / 1000;
            props.handleClick(answer, elapsedTimeInSeconds);
            setAnswer('');
        } else if (event.key === 'ArrowRight') {
            // Action when Right Arrow key is pressed
            props.next()
        }
    };
    
    return (   

        <div>

            <h1>{props.card.word === undefined? redirect("/dashboard"): props.card.word }</h1>
            <input type="text" value={answer} onChange={(e) => handleInputChange(e)}/>
            <button onClick={() =>{
                const endTime = new Date().getTime();
                const elapsedTimeInSeconds = (endTime - startTime) / 1000;
                props.handleClick(answer, elapsedTimeInSeconds);
                setAnswer('');
            }}>Check</button>
            <button onClick={props.next}>next</button>
            <h1>{answer}</h1>
            <h1>{formatTime(elapsedTime)}</h1>
            
        </div>
    )
}