import axios from "axios"
const apiUrl = "http://127.0.0.1:8000/"

export  async function POST(request){

    const {user_id, level} = await request.json()
    
    try {
       const game = await axios.post(`${apiUrl}getgamesession/`,{
        user_id, level
       })
       return new Response(game)
    } catch (error) {
        if (error.response && error.response.status === 401){
            return new Response("game")
        }
    }
    

}