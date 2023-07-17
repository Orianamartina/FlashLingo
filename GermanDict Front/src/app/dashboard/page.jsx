"use client"
import NavBar from "./Components/NavBar"
import Logo from "./DashboardCards/Logo"; 
import { useRouter } from 'next/navigation';
import style from "./styles/dashboard.module.css"
import { Instructions } from "./DashboardCards/Instructions";
import LevelCard from "./DashboardCards/LevelCard";
import UserProfile from "./DashboardCards/UserProfile";
   
export default function Dashboard(){

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      user = null
    }
    console.log(user)
    const {push} = useRouter()

    
    return (

        <div className={style.dashboardContainer}>
            {!user? push("/login"):(
                <>
                    <div>
                        <NavBar></NavBar>  
                    </div>
                    <div>
                        <div className={style.squaresContainer}>
                            <LevelCard userId={user.id}></LevelCard> 
                            <Logo></Logo>
                            
                        </div>
                        <div className={style.squaresContainer2}>
                            <Instructions />
                        </div>
                    </div>
                    <div className={style.sideSquareContainer}>
                        <UserProfile 

                        
                        />

                    </div>

                </>
            )
            
            
            }
           
        </div>
    )
}