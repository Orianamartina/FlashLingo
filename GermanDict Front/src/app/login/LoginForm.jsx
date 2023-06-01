"use client";
import axios from 'axios';

export default function LoginForm(){

  

    return(
        <div>
            <form onSubmit={handleSubmit}>
                
                <label htmlFor="">Email</label>
                <input onChange={handleInputChange} placeholder="Email">

                </input>
                <label>Password</label>
                <input onChange={handleInputChange} placeholder="Password">

                </input>
            </form>
        </div>
    )
}