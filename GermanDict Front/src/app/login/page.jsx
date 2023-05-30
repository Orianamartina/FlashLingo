import LoginButton from "./LoginButton"
import LoginForm from "./LoginForm"
import Link from "next/link"

export default function Login(){

    
    return (
        <div>
            <h1>Log In</h1>
            <LoginForm></LoginForm>
            <LoginButton></LoginButton>

            <div>

                <h3>Not registered?</h3>
                <Link href={"/register"}>
                    Create account
                </Link>
            </div>
            
        </div>
    )
} 