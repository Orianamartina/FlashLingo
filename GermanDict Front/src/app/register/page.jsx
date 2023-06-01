import RegisterButton from "./RegisterButton"
import RegisterForm from "./RegisterForm"

export default function Login(){

    
    return (
        <div>
            <h1>Log In</h1>
            <RegisterForm></RegisterForm>
            <RegisterButton></RegisterButton>
        
            <div>

                <h3>Already registered?</h3>
                <Link href={"/login"}>
                    Login
                </Link>
            </div>
            
        </div>
    )
} 