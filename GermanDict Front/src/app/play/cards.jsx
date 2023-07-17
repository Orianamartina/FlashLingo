"use client"
import 'regenerator-runtime/runtime'
import { useEffect, useState, } from "react";
import Image from 'next/image';
import style from "./play.module.css"
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import mic from "../../../public/microfono.png"
export default function Cards(props){
   
    const [answer, setAnswer] = useState()
    const [startTime, setStartTime] = useState(null);
    const submitted = props.submitted
    const answerStatus = props.answerStatus

    //mic config
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const [allowMic, setAllowMic] = useState()
   

    //timer for word
    const startTimer = () => {
      setStartTime(Date.now());
    };
  
     
    useEffect(() => {
        startTimer(); 
        if (!browserSupportsSpeechRecognition) {
            setAllowMic(false)   
        }
        else{
            setAllowMic(true)
        }
    }, []);
    
    function handleInputChange(e){
        setAnswer(e.target.value)
    }

    const handleKeyPress = (event, answer, setAnswer) => {
        if (event.key === 'Enter') {
            if(answer.length > 0 && !submitted){
                const elapsedTime = (Date.now() - startTime) / 1000
    
                props.handleClick(answer, elapsedTime);
                setAnswer('');
                resetTranscript()
            }
            
         
        } else if (event.key === 'ArrowRight') {
            // Action when Right Arrow key is pressed
            if(submitted){
                startTimer()
                props.next()
                resetTranscript
            }
            
        }
    };

    
    const [micOn, setMicOn] = useState(false)
    function controlMic(){
        if(micOn){
            SpeechRecognition.startListening({language: "en-US"})
        }
        else{
            SpeechRecognition.stopListening 
            setAnswer(transcript)
        }

    }
    //
    return(
        <div>
            <div className={`${style.cardContainer} ${submitted? style.flipped: ""}`}>
                <div className={style.innerCard}>
                    <div className={style.frontCard}>
                        <h1 className={style.word}>{props.card.word}</h1>
                        
                        <input className={style.input} autoFocus type="text" value={answer} onChange={(e) => handleInputChange(e)} onKeyDown={(e) =>handleKeyPress(e, answer, setAnswer)}/>
                    
                        <button className={style.button} onClick={() =>{
                            const elapsedTime = (Date.now() - startTime) / 1000
                            props.handleClick(answer, elapsedTime);
                            setAnswer('')
                            resetTranscript();}}>Check
                            
                        </button>    
                        <div className={`${allowMic? style.micEnabled: style.micDisabled} ${style.micContainer}`}>
                            <p>Microphone: {listening ? 'on' : 'off'}</p>
                           
                                <Image src={mic} className={style.micButton} onClick={() =>     {setMicOn(!micOn); controlMic();         setAnswer(transcript)}}></Image>
                            
                            <p>{transcript}</p>
                        </div>
                            
            </div> 
                    
                    <div className={`${style.backCard} ${style[answerStatus]}` }>
                        <div className={style.answerResult}>
                            {answerStatus === "red"?
                                <div>
                                    <h1>Try Again!</h1>
                                    <h2>- {props.card.translation1}</h2>
                                    <h2> {props.card.translation2 != "null"? "- " + props.card.translation2: ""}</h2>
                                    <h2> {props.card.translation3 != "null"? "- " + props.card.translation3: ""}</h2>
                                </div>
                                : answerStatus === "yellow"? 
                                <h1> "Good job, keep practicing!"</h1>:
                                answerStatus === "green"?
                                <h1>Well done!</h1>: ""
                                }
                        </div>
                        <button className={`${style.button}`} onClick={() => {props.next();  startTimer();      resetTranscript}}>next</button>
                    </div>

                </div>
                
                
            </div>
            
        
            
            
        </div>
    )
   
}