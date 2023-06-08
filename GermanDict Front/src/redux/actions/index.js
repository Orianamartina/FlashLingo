import { USERTOKEN} from "../action-types";

import axios from "axios";
const apiUrl = "http://127.0.0.1:8000/"


export const userToken= (loginCredentials) => {
    return async function(dispatch){
        let response = await axios.post(`${apiUrl}api-token-auth/`, loginCredentials, {
            withCredentials: true
          });
    
        localStorage.setItem("userToken", JSON.stringify(response.data));
        return dispatch({type: USERTOKEN, payload: response.data})
    }
}
