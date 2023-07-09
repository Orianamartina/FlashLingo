import RegisterButton from "./RegisterButton"
import RegisterForm from "./RegisterForm"
import Link from "next/link"
import style from "./registerPage.module.css"
export default function Login(){

    
    return (
        <div className={style.container}>
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