import { USERTOKEN} from "../action-types";

import axios from "axios";
const apiUrl = "http://127.0.0.1:8000/"


export const userToken= (loginCredentials) => {
    return async function(dispatch){
        
        return dispatch({type: USERTOKEN, payload: response.data})
    }
}


