"use client";
import axios from 'axios';
import LoginButton from './LoginButton';
import { useEffect, useState } from 'react';



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


        const username = form.username
        const password =  form.password

        try{
            
            const response = await axios.post("http://127.0.0.1:8000/login/",
            {
                username,
                password
            },{
                headers:{
                    'X-CSRFToken': csrftoken 
                }
            });
            
            if (response.status === 200) {
                //login succesfull, store user data on storage
            }else{

            }
        } catch (error){

        }

    }

    return(
        <div>
            <form onSubmit={handleSubmit} id="form">
                
                <label htmlFor="">Email</label>
                <input onChange={handleInputChange} placeholder="Username" name='username'>

                </input>
                <label>Password</label>
                <input onChange={handleInputChange} placeholder="Password" password='password'>

                </input>
            </form>
            <button type='submit' form='form'>LogIn</button>
        

        </div>
    )
}