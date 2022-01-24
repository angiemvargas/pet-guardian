import {RegisterType} from '../actions/RegisterAction'
const registerState = {
    isLoading:false,
    errMess: null,
    register:[],
}

export const register= (state = registerState , action) => {
    switch (action.type) {
        case RegisterType.REGISTER_SUCCESS:
             
            return{...state, errMess: false, isLoading: false,register: action.payload};

        case RegisterType.REGISTER_FAIL:

            return{...state, errMess: action.payload};
        
        case RegisterType.REGISTER_LOADING :
            return {...state, isLoading: true,  register: []}
        default:
            break;
    }
    return state;
};

