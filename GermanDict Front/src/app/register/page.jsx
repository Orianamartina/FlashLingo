import RegisterButton from "./RegisterButton"
import RegisterForm from "./RegisterForm"
import Link from "next/link"
import style from "./registerPage.module.css"
export default function Login(){

    
    return (
        <div>
            <h1>Register</h1>
            <RegisterForm></RegisterForm>
         
        
            <div>

                <h3 className={style.text} >Already registered?</h3>
                <Link href={"/login"}>
                    Login
                </Link>
            </div>
            
        </div>
    )
} 