"use client"

import LoginForm from "./LoginForm"
import Link from "next/link"
import style from "./loginPage.module.css"
import { redirect } from 'next/navigation';
import { useEffect } from "react";
export default function Login(){
    let user =  JSON.parse(localStorage.getItem("user"))?? null
    console.log(user)
   
    return (
        <div>
            {user? redirect('/dashboard'):(
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
            )}
            
        </div>
    )
} 