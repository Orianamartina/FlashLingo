"use client";
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import style from "./loginPage.module.css"


export default function LoginForm(){

    const [form, setForm] = useState({
        username : "",
        password : ""
    })

    const  handleInputChange = (event) => {
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        //django cookie
        const { csrftoken } = parseCookies();

        const username = form.username
        const password =  form.password

        try{
          
            await axios.post('http://127.0.0.1:8000/login/', username, password, {withCredentials: true})
             
          
            if (response.status === 200) {
                //login successful, store user data on storage
            }else{
                
            }
        } catch (error){

        }

    }

    return(
        <div className={style.formContainer} >
            <form onSubmit={handleSubmit} id="form">
                
                <label  className={style.formLabel} htmlFor="">Email</label>
                <input className={style.formInput} onChange={handleInputChange} placeholder="Username" name='username'>

                </input>
                <label className={style.formLabel} >Password</label>
                <input className={style.formInput} onChange={handleInputChange} placeholder="Password" password='password'>

                </input>
            </form>
            <button className={style.loginButton} type='submit' form='form'>LogIn</button>
        

        </div>
    )
}