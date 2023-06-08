import { USERTOKEN} from "../action-types"
const initialState = {
    userToken: "",

}


const reducer = (state = initialState, action) => {

    switch(action.type){
    
        case USERTOKEN: {
            return { ...state, userToken: action.payload };
        }


        default: {
            return state
        }
    }

}

export default reducer