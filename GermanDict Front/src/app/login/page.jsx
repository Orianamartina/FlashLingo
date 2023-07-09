"use client";

import LoginForm from "./LoginForm"
import Link from "next/link"
import style from "./loginPage.module.css"
import { redirect } from 'next/navigation';
import logo from "../../../public/logo.png"
import Image from "next/image";
export default function Login(){
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      user = null
    }
    return (
        <div>
            {user? redirect('/dashboard'):(
                <div className={style.container}>
                    <Image className={style.logo} alt= "logo" src={logo}></Image>
                    <h1>Log In</h1>
                    <LoginForm></LoginForm>


                    <div>

                        <h3 className={style.notRegistered}>Not registered? &nbsp; 
                            <Link className={style.registerLink} href={"/register"}>
                                Create account
                            </Link>
                        </h3>
                    </div>
                
                </div>
            )}
            
        </div>
    )
} 