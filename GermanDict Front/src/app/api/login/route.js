'use server';
import Cookies from 'js-cookie';
import axios from "axios"
import cookie from 'cookie'
import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'
const apiUrl = "http://127.0.0.1:8000/"
export  async function POST(request){
        let accessToken =  null
        const {username, password} = await request.json()

        const body = {"username": username, "password": password}
        try {
            let response = await axios.post(`${apiUrl}api/token/`, body);
            accessToken = response.data.access
            //res.setHeader('Set-Cookie', cookie.serialize('refresh', accessResponse.refresh, {httpOnly: true, secure: false, sameSite: 'strict', maxAge: 60 * 60 * 24, path: '/'}))        
        } catch (error) {
            

            return new Response({message: 'Something went wrong'}, {status: 500})
           // return res.status(500).json({message: 'Something went wrong'})
            
        }
        if (accessToken){
            const csrfToken = await axios.get(`${apiUrl}csrf_token`,
            {headers:{
                'Authorization': `Bearer ${accessToken}`,
            }})
            console.log(csrfToken.data)
            Cookies.set("csrftoken","wGxHruDbmePSNsfDPZKQw8lF5r54TSga")
            const data = await axios.post(`${apiUrl}user/`, 
            body,
            {headers: {
                "X-CSRFToken": "wGxHruDbmePSNsfDPZKQw8lF5r54TSga",
                "Content-Type": "application/json",
                
            }})
            const filteredData = data.data;
            delete filteredData.password;
            delete filteredData.email;
            const dataAndToken = {user: filteredData, accessToken}
            const dataResponse = JSON.stringify(dataAndToken);
            return new Response(dataResponse, {
                status: 200,
                headers:{
                    'Set-Cookie': `token=${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
        }

    
}