import LogOutButton from "./LogOutButton"
import style from "../styles/navBar.module.css"
import { ProfileButton } from "./ProfileButton";
export default function NavBar(props){

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
              
                  <ProfileButton></ProfileButton>
            
            </div> 
          
            <div>
              <h1 className={style.username}>Welcome, {user.username}</h1>
            </div>
 
          

        </div>
    )
}