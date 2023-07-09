"use client";
import axios from 'axios';
import style from "./registerPage.module.css"
export default function RegisterForm(){
    const handleSubmit = () => {

    }
    
    const handleInputChange = () => {
        
    }
  

    return(
        <div className={style.formContainer}>
            <form className={style.form} onSubmit={handleSubmit}>
                <label  className={style.registerLabel} htmlFor="">First name</label>
                <input  className={style.registerInput} onChange={handleInputChange} placeholder="First Name">

                </input>
                <label  className={style.registerLabel} htmlFor="">Last name</label>
                <input  className={style.registerInput} onChange={handleInputChange} placeholder="Last name">

                </input>
                <label  className={style.registerLabel} htmlFor="">Email</label>
                <input  className={style.registerInput} onChange={handleInputChange} placeholder="Email">

                </input>
                <label className={style.registerLabel} >Password</label>
                <input className={style.registerInput}  onChange={handleInputChange} placeholder="Password">

                </input>
                <label  className={style.registerLabel} htmlFor=""> Repeat password</label>
                <input  className={style.registerInput} onChange={handleInputChange} placeholder="Repeat Password">

                </input>
            </form>

            <button className={style.registerButton}>Register</button>
        </div>
    )
}