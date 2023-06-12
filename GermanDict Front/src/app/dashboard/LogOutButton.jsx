"use client";
import { useRouter } from 'next/navigation';



export default function LogOutButton(){

    const {push} = useRouter()
    const handleLogOut = () => {

        localStorage.removeItem("user")
        localStorage.removeItem("accesstoken")
        push("/login")
    }

    
    return (

        <div>
            <button onClick={() => handleLogOut()} >Log Out</button>


            
        </div>
    )
}