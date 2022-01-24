import axios from 'axios'

const RegisterType = {
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_FAIL: "REGISTER_FAIL",
    REGISTER_LOADING : "REGISTER_LOADING"
}

const RegisterEmployeeAction = (userState,history) =>{
    return async (dispatch) => {
        dispatch(RegisterEmployeeActionLoading(true));
        try {
            const res = await axios.post("user/create",userState);
            const {data} = res;
            console.log(data);
            dispatch({type:RegisterType.REGISTER_SUCCESS,payload:data});
            history.push("/employee-management")
        } catch (error) {
            console.log(error)
            dispatch({type:RegisterType.REGISTER_FAIL,payload:true});
        }
    }
}

const RegisterEmployeeActionLoading = () =>({
    type:RegisterType.REGISTER_LOADING
})


export {RegisterType,RegisterEmployeeAction, RegisterEmployeeActionLoading}