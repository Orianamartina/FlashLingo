import { USERTOKEN, GETLEVEL} from "../action-types";
import { cardQueue } from "@/app/utils/gameplay";
import axios from "axios";
const apiUrl = "http://127.0.0.1:8000/"
import Cookies from "js-cookie";

export const userToken= (loginCredentials) => {
    return async function(dispatch){
        
        return dispatch({type: USERTOKEN, payload: response.data})
    }
}

export const getLevel = (level, userId) => {
    return async function(dispatch){
        try {
            const response =await axios.get(`${apiUrl}getgamesession/?level=${level}&user=${userId}`)
            const data = cardQueue(response.data)
            return dispatch({type: GETLEVEL, payload: data})
        } catch (error) {
            if (error.response && error.response.status === 404){
                
                const newSession = await axios.post(`${apiUrl}setgamesession/`,{
                    "level": level,
                    "user_id": userId
                },{ withCredentials: true })
                let data = cardQueue(newSession.data)
                return dispatch({type: GETLEVEL, payload: data})
            }

        }
       
        
    }

}
