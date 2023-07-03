"use client"
import { getLevel } from "@/redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";


export default function Cards(props){
   
    const [answer, setAnswer] = useState()
   
    function handleInputChange(e){
        setAnswer(e.target.value)
    }
    
    
    return (   

        <div>

            <h1>{props.cards[0]}</h1>
            <input type="text" onChange={(e) => handleInputChange(e)}/>
            <button onClick={() =>{props.handleClick(answer); setAnswer(" ")}}>Check</button>
            <h1>{answer}</h1>
            <h1>{props.hola}</h1>
            
        </div>
    )
}