"use client"

import { useRouter } from 'next/navigation';
import { getLevel } from "@/redux/actions";
import {useDispatch} from "react-redux";



export default function LevelCard(props){

    const {push} = useRouter()
    
    const dispatch = useDispatch()
    const handleLevelClick =async (level)  => {
        await dispatch(getLevel(level, props.userId))
        push(`/play`)
    }
    
    return (

        <div>
            <button onClick={() => handleLevelClick(props.number)}>{props.number}</button>

            
        </div>
    )
}