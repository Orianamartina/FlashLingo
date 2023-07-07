"use client"

import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import style from "./play.module.css"


export default function Cards(props){
   
    const [answer, setAnswer] = useState()
    const [startTime, setStartTime] = useState(null);
    const submitted = props.submitted
    const answerStatus = props.answerStatus
    const [flipped, setFlipped] = useState(false)
    const startTimer = () => {
      setStartTime(Date.now());
    };
  
    function handleInputChange(e){
        setAnswer(e.target.value)
    }
    
    useEffect(() => {
        startTimer();
    }, []);

    const handleKeyPress = (event, answer, setAnswer) => {
        if (event.key === 'Enter') {
            if(answer.length > 0 && !submitted){
                const elapsedTime = (Date.now() - startTime) / 1000
                props.handleClick(answer, elapsedTime);
                setAnswer('');
            }
            
         
        } else if (event.key === 'ArrowRight') {
            // Action when Right Arrow key is pressed
            if(submitted){
                startTimer()
                props.next()
            }
            
        }
    };
    //
    return(
        <div>
            <div className={`${style.cardContainer} ${submitted? style.flipped: ""}`}>
                <div className={style.innerCard}>
                    <div className={style.frontCard}>
                        {props.card.word}
                        <input type="text" value={answer} onChange={(e) => handleInputChange(e)} onKeyDown={(e) =>handleKeyPress(e, answer, setAnswer)}/>
                    </div>
                    <div className={style.backCard}>
                        {props.card.translation1}
                    </div>

                </div>
                
                
            </div>
            <button onClick={() =>{
                const elapsedTime = (Date.now() - startTime) / 1000
                props.handleClick(answer, elapsedTime);
                setAnswer('');
            }}>Check</button>
            <button onClick={props.next}>next</button>
        </div>
    )
    return (   
        <div className={style.container}>
            <div className={`${style.background} ${submitted? style.flipped : ''} ${answerStatus === 'red' ? style.red : answerStatus === 'green' ? style.green : answerStatus === 'yellow' ? style.yellow : style.neutral} `}>

                <h1 className={style.content}>{ props.card.word}</h1>
                <input type="text" value={answer} onChange={(e) => handleInputChange(e)} onKeyDown={(e) =>handleKeyPress(e, answer, setAnswer)}/>
                <button onClick={() =>{
                    const elapsedTime = (Date.now() - startTime) / 1000
                    props.handleClick(answer, elapsedTime);
                    setAnswer('');
                }}>Check</button>
                <button onClick={props.next}>next</button>
                <h1>{answer}</h1>

        
            </div>
        </div>
    )
}