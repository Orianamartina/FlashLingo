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
            const response = await axios.post(`${apiUrl}getgamesession/`,{
                "level": level,
                "user_id": userId
                },
                {headers:{

                }}
            ) 

        } catch (error) {
            
        }

       
        return dispatch({type: GETLEVEL, payload: response.data})
    }

}

