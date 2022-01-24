import axios from 'axios'

const EmployeeType = {
    GET_ALL_EMPLOYEE:"GET_ALL_EMPLOYEE",
    GET_ALL_EMPLOYEE_LOADING:"GET_ALL_EMPLOYEE_LOADING",
    GET_ALL_EMPLOYEE_FAIL:"GET_ALL_EMPLOYEE_FAIL",
    DELETE_EMPLOYEE_ACTION:"DELETE_EMPLOYEE_ACTION",
    DELETE_EMPLOYEE_FAIL:"DELETE_EMPLOYEE_FAIL",
    SEARCH_EMPLOYEE:"SEARCH_EMPLOYEE",
    SEARCH_EMPLOYEE_FAIL:"SEARCH_EMPLOYEE_FAIL",
    UPDATE_EMPLOYEE_SUCCESS:"UPDATE_EMPLOYEE_SUCCESS",
    UPDATE_EMPLOYEE_FAIL:"UPDATE_EMPLOYEE_FAIL",
    UPDATE_EMPLOYEE_LOADING:"UPDATE_EMPLOYEE_LOADING"
}



const GetAllEmployee = () =>{
    return async (dispatch)=>{
        dispatch(GetPEmployeeActionLoading(true));
        try {
            const res = await axios.get("user");
            const {data} = res;
            console.log(data);
            dispatch({type:EmployeeType.GET_ALL_EMPLOYEE,payload:data});           
        } catch (error) {
            console.log(error)
            dispatch({type:EmployeeType.GET_ALL_EMPLOYEE_FAIL,payload:error});
        }
    }
}
const DeleteEmployeeAction = (idPet) =>{
    return async (dispatch) => {
        try {
            const res = await axios.delete("user/"+idPet);
            const {data} =res;
            console.log(data);
            dispatch({type:EmployeeType.DELETE_EMPLOYEE_ACTION,payload:data});
            window.location.reload()
        } catch (error) {
            console.log(error)
            dispatch({type:EmployeeType.DELETE_EMPLOYEE_FAIL,payload:error});
        }
    }
}

const SearchEmployeeByID = (idPet) =>{
    return async (dispatch)=>{
        try {
            const res = await axios.get("user/"+idPet);
            const {data} = res;
            console.log(data);
            dispatch({type:EmployeeType.SEARCH_EMPLOYEE,payload:data});           
        } catch (error) {
            console.log(error)
            dispatch({type:EmployeeType.SEARCH_EMPLOYEE_FAIL,payload:error});
        }
    }
}

const UpdateEmployeeAction = (petState) =>{
    return async (dispatch) => {
        dispatch(UpdateEmployeeActionLoading(true));
        try {
            const res = await axios.put("user/update",petState);
            const {data} = res;
            console.log(data);
            dispatch({type:EmployeeType.UPDATE_EMPLOYEE_SUCCESS,payload:data});
            window.location.reload()
        } catch (error) {
            console.log(error)
            dispatch({type:EmployeeType.UPDATE_EMPLOYEE_FAIL,payload:error});
        }
    }
}

const UpdateEmployeeActionLoading = () =>({
    type:EmployeeType.UPDATE_EMPLOYEE_LOADING
})

const GetPEmployeeActionLoading = () =>({
    type:EmployeeType.GET_ALL_EMPLOYEE_LOADING
})

export {EmployeeType,GetAllEmployee,DeleteEmployeeAction,SearchEmployeeByID,UpdateEmployeeAction}