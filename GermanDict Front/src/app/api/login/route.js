'use server';
import Cookies from 'js-cookie';
import axios from "axios"

const apiUrl = "http://127.0.0.1:8000/"
export  async function POST(request){
        let accessToken =  null
        let refreshToken = null
        const {username, password} = await request.json()

        const body = {"username": username, "password": password}
        try {
            let response = await axios.post(`${apiUrl}api/token/`, body);
            refreshToken = response.data.refresh
            accessToken = response.data.access
            console.log(response.data)
        
        } catch (error) {
            if (error.response && error.response.status === 401) {
                return new Response('Invalid credentials', { status: 401 });
              } else {
                return new Response('Something went wrong', { status: 500 });
              }
        
        }
        if (accessToken){
            Cookies.set("refreshToken", refreshToken, { httpOnly: true, secure: true })
            Cookies.set('accessToken', accessToken, { httpOnly: true, secure: true });

            const csrfToken = await axios.get(`${apiUrl}csrf_token/`,
                 {headers:{
                    'Authorization': `Bearer ${accessToken}`,
                  }})
    
            const token = csrfToken.data.csrf_token
            const data = await axios.post(`${apiUrl}user/`, 
                body,
                {headers: {

                    "Content-Type": "application/json",
                    "Cookie": `csrftoken=${token}`, 
                    'X-CSRFToken': token,
                    withCredentials: true,
            
                }}
            )

            const filteredData = data.data;
            delete filteredData.password; 
            delete filteredData.email;
            const dataAndToken = {user: filteredData, accessToken}
            const dataResponse = JSON.stringify(dataAndToken);
            return new Response(dataResponse, {
                status: 200,
                headers:{

                    "Content-Type": "application/json"
                }
            })
            
        
        }
       
    
}