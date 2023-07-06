import { USERTOKEN, GETLEVEL, FORMATLEVEL, SAVESESSION} from "../action-types"
const initialState = {
    userToken: "",
    gameSession: {},
    sessionId: "",
    gameCards: []
}


const reducer = (state = initialState, action) => {

    switch(action.type){
    
        case USERTOKEN: {
            return { ...state, userToken: action.payload };
        }
        case GETLEVEL:{
            return {...state, gameSession: action.payload.queue, sessionId: action.payload.id }
        }
       
        default: {
            return state
        }
    }

}

export default reducer