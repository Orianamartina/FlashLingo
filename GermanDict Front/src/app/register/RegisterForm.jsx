"use client";
import axios from 'axios';

export default function RegisterForm(){

  

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">First name</label>
                <input onChange={handleInputChange} placeholder="First Name">

                </input>
                <label htmlFor="">Last name</label>
                <input onChange={handleInputChange} placeholder="Last name">

                </input>
                <label htmlFor="">Email</label>
                <input onChange={handleInputChange} placeholder="Email">

                </input>
                <label>Password</label>
                <input onChange={handleInputChange} placeholder="Password">

                </input>
                <label htmlFor=""> Repeat password</label>
                <input onChange={handleInputChange} placeholder="Repeat Password">

                </input>
            </form>
        </div>
    )
}