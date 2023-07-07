"use client"
import 'regenerator-runtime/runtime'
import { useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import style from "./play.module.css"
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";

export default function Cards(props){
   
    const [answer, setAnswer] = useState()
    const [startTime, setStartTime] = useState(null);
    const submitted = props.submitted
    const answerStatus = props.answerStatus
    const [flipped, setFlipped] = useState(false)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const [allowMic, setAllowMic] = useState()
   


    const startTimer = () => {
      setStartTime(Date.now());
    };
  
    function handleInputChange(e){
        setAnswer(e.target.value)
    }
    
    useEffect(() => {
        startTimer(); 
        if (!browserSupportsSpeechRecognition) {
            setAllowMic(false)   
        }
        else{
            setAllowMic(true)
        }
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
        <div className={style.container}>
            <div className={`${style.cardContainer} ${submitted? style.flipped: ""}`}>
                <div className={style.innerCard}>
                    <div className={style.frontCard}>
                        <h1 className={style.word}>{props.card.word}</h1>
                        
                        <input className={style.input} type="text" value={answer} onChange={(e) => handleInputChange(e)} onKeyDown={(e) =>handleKeyPress(e, answer, setAnswer)}/>
                    
                        <button className={style.button} onClick={() =>{
                            const elapsedTime = (Date.now() - startTime) / 1000
                            props.handleClick(answer, elapsedTime);
                            console.log(elapsedTime)
                            console.log(answer)
                            setAnswer('');}}>Check
                            
                        </button>
                            
            </div> 
                    
                    <div className={`${style.backCard} ${style[answerStatus]}` }>
                        {answerStatus === "red"?
                            <div>
                                <h1>Right Answers:</h1>
                                <h1>{props.card.translation1}</h1>
                            </div>
                             : answerStatus === "yellow"? 
                            <h1> "Good job, keep practicing!"</h1>:
                            answerStatus === "green"?
                            <h1>Well done!</h1>: ""
                            }<button className={style.button} onClick={() => {props.next();  startTimer()}}>next</button>
                    </div>

                </div>
                
                
            </div>
            
            <div className={`${allowMic? style.micEnabled: style.micDisabled} ${style.micContainer}`}>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button className={style.button} onClick={() =>SpeechRecognition.startListening({language: "en-US"})}>Listen</button>
                <button className={style.button} onClick={() => {SpeechRecognition.stopListening, setAnswer(transcript)}}>Stop</button>
                <button className={style.button} onClick={resetTranscript}>Reset</button>
                <p>{transcript}</p>
            </div>
            
            
        </div>
    )
   
}