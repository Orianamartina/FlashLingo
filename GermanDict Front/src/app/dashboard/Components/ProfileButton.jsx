import style from "../styles/navBar.module.css"
import Image from "next/image";
import userImg from "../../../../public/user.png"

export const ProfileButton = () => {
    




    return(   
        <div className={style.iconContainer}>
          <Image alt="User icon" className={style.icon} src={userImg}></Image>
          <span className={style.buttonText}>Profile</span>
        </div>
       )
}