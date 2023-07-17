"use server";
import axios from "axios"
const apiUrl = "http://127.0.0.1:8000/"

export  async function POST(request){

    const {sessionId, body, token, userId} = await request.json()

         const updateStats = await axios.post(`${apiUrl}user-statistics/${userId}/`, {
            headers:{
                "Cookie": `csrftoken=${token}`, 
                'X-CSRFToken': token,
            }
        },{withCredentials:true})
        const sessionSaved = await axios.post(`${apiUrl}game-session/update/${sessionId}/`, body, {
            headers:{
                "Cookie": `csrftoken=${token}`, 
                'X-CSRFToken': token,
            }
        },{withCredentials:true})

        const dataResponse = JSON.stringify(sessionSaved.data);
       
        return new Response(dataResponse, {
            status: 200,
            headers:{
                "Content-Type": "application/json"
            }
        })
            
         
    
    }
    

