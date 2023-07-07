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
                <LogOutButton></LogOutButton>
           
               <Image className={style.icon} src={userImg}></Image>
            </div> 
          
            <div>
              <h1 className={style.username}>Welcome, {user.username}</h1>
            </div>
 
          

        </div>
    )
}