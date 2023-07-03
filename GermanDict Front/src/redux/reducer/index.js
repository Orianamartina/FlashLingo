import { USERTOKEN, GETLEVEL, FORMATLEVEL} from "../action-types"
const initialState = {
    userToken: "",
    gameSession: {},
    gameCards: []
}


const reducer = (state = initialState, action) => {

    switch(action.type){
    
        case USERTOKEN: {
            return { ...state, userToken: action.payload };
        }
        case GETLEVEL:{
            return {...state, gameSession: action.payload }
        }
        case FORMATLEVEL:{
            return {...state, gameCards:action.payload}
        }

        default: {
            return state
        }
    }

}

export default reducer