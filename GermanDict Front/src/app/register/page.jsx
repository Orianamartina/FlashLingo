import Image from "next/image"
import RegisterForm from "./RegisterForm"
import Link from "next/link"
import style from "./registerPage.module.css"
import logo from "../../../public/logo.png"
export default function Login(){

    
    return (
        <div className={style.container}>
            <Image className={style.logo} src={logo} alt="logo">

            </Image>
            <h1 className={style.text}>Register</h1>
            <RegisterForm></RegisterForm>
         
        
            <div>

                <h3 className={style.text} >Already registered? &nbsp;
                    <Link className={style.loginLink} href={"/login"}>
                        Login
                    </Link>
                </h3>
                
            </div>
            
        </div>
    )
} 