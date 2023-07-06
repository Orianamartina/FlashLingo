"use client"

import { useRouter } from 'next/navigation';
import { getLevel } from "@/redux/actions";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';


export default function LevelCard(props){

    const {push} = useRouter()
    
    const dispatch = useDispatch()
    const refreshToken = Cookies.get('refreshToken');
    const token = Cookies.get('accessToken')
    const handleLevelClick =async (level)  => {
        await dispatch(getLevel(level, props.userId, refreshToken))
        push(`/play`)
    }
    
    return (

        <div>
            <button onClick={() => handleLevelClick(props.number)}>{props.number}</button>

            
        </div>
    )
}