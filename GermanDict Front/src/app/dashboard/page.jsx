"use client"
import UserProfile from "./UserProfile"
import UserStatistics from "./UserStatistics"
import Logo from "./Logo";
import SelectLevel from "./selectLevel";
import { useRouter } from 'next/navigation';
import style from "./styles/dashboard.module.css"
   
export default function Dashboard(){

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      user = null
    }

    const {push} = useRouter()

    
    return (

        <div>
            {!user? push("/login"):(
                <>
                    <UserProfile></UserProfile>
                    <UserStatistics></UserStatistics>   
                    <SelectLevel userId={user.id}></SelectLevel>
                    <Logo></Logo>
                </>
            )
            
            
            }
           
        </div>
    )
}