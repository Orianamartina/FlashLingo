"use client"
import UserProfile from "./UserProfile"
import UserStatistics from "./UserStatistics"
import ContinueButton from "./ContinueButton"
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';


   
export default function Dashboard(){

    const user = JSON.parse(localStorage.getItem("user")) ?? null

    const {push} = useRouter()


    
    return (

        <div>
            {!user? push("/login"):(
                <>
                    <UserProfile></UserProfile>
                    <UserStatistics></UserStatistics>   
                    <ContinueButton></ContinueButton>
                </>
            )
            
            
            }
           
        </div>
    )
}