"use client";
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from "./loginPage.module.css"
import { useRouter } from 'next/navigation';



export default function LoginForm(){
    const router = useRouter()
    const token =  useSelector((state) => state.userToken)
    const dispatch = useDispatch()
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = form.username
        const password =  form.password

        try{
           
            const response = await axios.post('http://localhost:3000/api/login/', {username: username, password: password})
            if (response ){
                localStorage.setItem("user", JSON.stringify(response.data.user))
                router.push("/dashboard")
            }
            
            
        }catch (error){
            console.log(error.message)
        }

    }

    return(
        <div className={style.formContainer} >
            <form onSubmit={handleSubmit} id="form">
                
                <label  className={style.formLabel} htmlFor="">Email</label>
                <input className={style.formInput} onChange={handleInputChange} placeholder="Username" name='username'>

                </input>
                <label className={style.formLabel} >Password</label>
                <input className={style.formInput} type="password" onChange={handleInputChange} placeholder="Password" name='password'>

                </input>
            </form>
            <button className={style.loginButton} type='submit' form='form'>Log In</button>
        

        </div>
    )
}