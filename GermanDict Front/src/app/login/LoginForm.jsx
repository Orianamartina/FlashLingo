"use client";
import axios from 'axios';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { userToken } from '@/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import style from "./loginPage.module.css"
const apiUrl = "http://127.0.0.1:8000/"


export default function LoginForm(){

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
            let response = await axios.post(`${apiUrl}api/token/`, form, {
                withCredentials: true
            });
            
            const accessToken = response.data.access
            if (accessToken){
                const userConfig = {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        
                    }
                }
                const {data: userData} = await axios.get(`${apiUrl}user`, userConfig)
                localStorage.setItem("userdata", JSON.stringify(userdata));
                return (json({user: userData, access:accessToken}))
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
                <input className={style.formInput} onChange={handleInputChange} placeholder="Password" name='password'>

                </input>
            </form>
            <button className={style.loginButton} type='submit' form='form'>LogIn</button>
        

        </div>
    )
}