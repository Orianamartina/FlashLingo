import { USERTOKEN, GETLEVEL} from "../action-types"
const initialState = {
    userToken: "",
    gameSession: {},
}


const reducer = (state = initialState, action) => {

    switch(action.type){
    
        case USERTOKEN: {
            return { ...state, userToken: action.payload };
        }
        case GETLEVEL:{
            return {...state, gameSession: action.payload }
        }

        default: {
            return state
        }
    }

}

export default reducer