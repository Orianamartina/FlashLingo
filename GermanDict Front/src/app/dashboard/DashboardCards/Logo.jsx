import Image from "next/image"
import logo from "../../../../public/logo.png"
import style from "../styles/dashboard.module.css"

export default function Logo(){
    

    return(
        <div>
            <Image className={style.logo} src={logo}></Image>
        </div>
    )
}