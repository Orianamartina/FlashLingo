import { USERTOKEN, GETLEVEL} from "../action-types";

import axios from "axios";
const apiUrl = "http://127.0.0.1:8000/"


export const userToken= (loginCredentials) => {
    return async function(dispatch){
        
        return dispatch({type: USERTOKEN, payload: response.data})
    }
}

export const getLevel = (level, userId) => {
    return async function(dispatch){
        try {
            const response =await axios.get(`${apiUrl}getgamesession/?level=${level}&user=${userId}`)
            return dispatch({type: GETLEVEL, payload: response.data})
        } catch (error) {
            if (error.response && error.response.status === 404){
                /*const getToken = await axios.post(`${apiUrl}api/token/refresh/`,{
                    "refresh": token
                })
                const accessToken = getToken.data.access*/
                const newSession = await axios.post(`${apiUrl}setgamesession/`,{
                    "level": level,
                    "user_id": userId
                },{ withCredentials: true })
                return dispatch({type: GETLEVEL, payload: newSession.data})
            }

        }
       
        
    }

}

