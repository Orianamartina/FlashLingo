"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logOut from "../../../../public/log-out.png"
import style from "../styles/navBar.module.css"
export default function LogOutButton(){

    const {push} = useRouter()
    const handleLogOut = () => {

        localStorage.removeItem("user")
        localStorage.removeItem("accesstoken")
        push("/login")
    }

    
    return (

        <div onClick={() => handleLogOut()} className={style.iconContainer}>
    
            <Image alt='log out button' className={style.icon} src={logOut}  ></Image>
            <span className={style.buttonText}>Log out</span>
            
        </div>
    )
}