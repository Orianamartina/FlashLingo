'use server';
import axios from "axios"
import cookie from 'cookie'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
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
            
            const data = await axios.get(`${apiUrl}user`,{"username": username, "password": password}, 
            {headers: {
                'HTTP_AUTHORIZATION': `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }})
            return new Response(data.data, {
                status: 200,
                headers:{
                    'Set-Cookie': `token=${accessToken}`
                }
            })
        }

    
}