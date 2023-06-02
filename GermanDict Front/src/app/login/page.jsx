
import LoginForm from "./LoginForm"
import Link from "next/link"
import style from "./loginPage.module.css"
export default function Login(){

    
    return (
        <div className={style.container}>
            <h1>Log In</h1>
            <LoginForm></LoginForm>


            <div>

                <h3>Not registered?</h3>
                <Link href={"/register"}>
                    Create account
                </Link>
            </div>
            
        </div>
    )
} 