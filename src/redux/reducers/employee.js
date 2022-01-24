import {EmployeeType} from '../actions/EmployeeAction'

const updateEmployeeState = {
    isLoading:false,
    error:null,
    errMess:"",
    successMess:"",
}

const getAllEmployeeState = {
    employees:[],
    isLoading:false,
    error:null,
    errMess:"",
}

const deleteEmployeeState = {
    success:"",
    error:null,
    errMess:"",
}

const searchEmployeeState ={
    employee:[],
    isLoading:false,
    error:null,
    errMess:"",
}

export const getAllEmployee= (state = getAllEmployeeState , action) => {
    switch (action.type) {
        case EmployeeType.GET_ALL_EMPLOYEE:
             
            return{...state, error: false,errMess: "", isLoading: false,employees: action.payload};

        case EmployeeType.GET_ALL_EMPLOYEE_FAIL:

            return{...state,error:true,isLoading: false, errMess: action.payload.message};
        
        case EmployeeType.GET_ALL_EMPLOYEE_LOADING :
            return {...state, isLoading: true,  employees: []}
        default:
            break;
    }
    return state;
};

export const deleteEmployee= (state = deleteEmployeeState , action) => {
    switch (action.type) {
        case EmployeeType.DELETE_EMPLOYEE_ACTION:
             
            return{...state, error: false,errMess: "",success: action.payload.message};

        case EmployeeType.DELETE_EMPLOYEE_FAIL:

            return{...state,error:true, errMess: action.payload.message};

        default:
            break;
    }
    return state;
};


export const searchEmployee= (state = searchEmployeeState , action) => {
    switch (action.type) {
        case EmployeeType.SEARCH_EMPLOYEE:
             
            return{...state, error: false,errMess: "",employee: action.payload};

        case EmployeeType.SEARCH_EMPLOYEE_FAIL:

            return{...state,error:true, errMess: action.payload.message};

        default:
            break;
    }
    return state;
};

export const updateEmployee= (state = updateEmployeeState , action) => {
    switch (action.type) {
        case EmployeeType.UPDATE_EMPLOYEE_SUCCESS:
             
            return{...state, error: false,errMess: "", isLoading: false,successMess: action.payload.message};

        case EmployeeType.UPDATE_EMPLOYEE_FAIL:

            return{...state,error:true,isLoading: false, errMess: action.payload.message};
        
        case EmployeeType.UPDATE_EMPLOYEE_LOADING :
            return {...state, isLoading: true,  successMess: ""}
        default:
            break;
    }
    return state;
};
