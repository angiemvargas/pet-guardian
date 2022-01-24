import axios from "axios";
import jwt from "jwt-decode";
import {AuthType} from '../actions/AuthAction'

const authState = {
    isLoading:false,
    isLoggedIn:false,
    user:{
        email:"",
        typeToken:"",
        token:"",
        roles:[],
    },
    error:null,
    errMess:""
}

const getAuthState = () =>{
    const auth = localStorage.getItem("auth");
    try {
        const authobj = JSON.parse(auth);
        const {token} = authobj.user;
        const tokenDecode = jwt(token)     
        const {exp} = tokenDecode;
        if(new Date(exp * 1000) > new Date()){
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            return authobj;
        }
        return authState;
    } catch (error) {
        return authState;
    }
}

const newAuth = getAuthState();

export const auth= (state = newAuth , action) => {
    switch (action.type) {
        case AuthType.LOGIN_SUCCESS:
            const newAuthState = {
                isLoggedIn:true,
                isLoading:false,
                user:action.payload,
                error:null
            };
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.token}`;
            localStorage.setItem("auth",JSON.stringify(newAuthState));
            return newAuthState;

        case AuthType.LOGIN_LOADING  :
            return {...state, isLoading: true,  user: []}

        case AuthType.LOGIN_FAIL:
            return {...state, error: true, isLoading: false,errMess:action.payload.message};
        
        case AuthType.LOGOUT_SUCCESS:
            localStorage.removeItem("auth");
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload}`;
            return authState;
                 
        case AuthType.LOGOUT_FAIL:
            localStorage.removeItem("auth");
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload}`;
            return authState;

        default:
            break;
    }
   return state;
};


    
