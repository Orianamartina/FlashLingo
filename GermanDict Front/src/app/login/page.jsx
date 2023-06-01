import LoginButton from "../register/RegisterButton"
import LoginForm from "../register/RegisterForm"
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