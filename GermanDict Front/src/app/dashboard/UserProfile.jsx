import LogOutButton from "./LogOutButton"
import Image from "next/image";
import userImg from "../../../public/user.png"
import style from "./styles/user.module.css"
export default function UserProfile(props){

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      user = null
    }


    return (

        <div className={style.userProfileContainer}> 
            <div className={style.profileButtonsContainer}>
                <div className={style.iconContainer}>
                  <LogOutButton></LogOutButton>
                  <span className={style.buttonText}>Log out</span>
                </div>
                  
               
                <div className={style.iconContainer}>
                  <Image className={style.icon} src={userImg}></Image>
                  <span className={style.buttonText}>Profile</span>
                </div>
               
            </div> 
          
            <div>
              <h1 className={style.username}>Welcome, {user.username}</h1>
            </div>
 
          

        </div>
    )
}