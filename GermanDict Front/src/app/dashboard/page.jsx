"use client"
import UserProfile from "./UserProfile"
import UserStatistics from "./UserStatistics"
import Logo from "./Logo";
import SelectLevel from "./selectLevel";
import { useRouter } from 'next/navigation';
import style from "./styles/dashboard.module.css"
import { Instructions } from "./Instructions";
   
export default function Dashboard(){

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      user = null
    }

    const {push} = useRouter()

    
    return (

        <div className={style.dashboardContainer}>
            {!user? push("/login"):(
                <>
                    <div>
                        <UserProfile></UserProfile>  
                    </div>
                    <div className={style.squaresContainer}>
                       <SelectLevel userId={user.id}></SelectLevel> 
                       <Logo></Logo>
                       <UserStatistics></UserStatistics>  
                    </div>
                    <div className={style.squaresContainer2}>
                        <Instructions />
                    </div>
                    
                     
                    
                    
                </>
            )
            
            
            }
           
        </div>
    )
}