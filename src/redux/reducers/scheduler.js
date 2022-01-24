import {SchedulerType} from '../actions/SchedulerAction'

const registerAppointmentState = {
    isLoading:false,
    error:null,
    errMess:"",
    successMess:"",
}

const getAllAppointmentState = {
    appointments:[],
    isLoading:false,
    error:null,
    errMess:"",
}

const deleteAppointmentState = {
    success:"",
    error:null,
    errMess:"",
}


export const registerAppointment= (state = registerAppointmentState , action) => {
    switch (action.type) {
        case SchedulerType.REGISTER_APPOINTMENT_SUCCESS:
             
            return{...state, error: false,errMess: "", isLoading: false,successMess: action.payload.message};

        case SchedulerType.REGISTER_APPOINTMENT_FAIL:

            return{...state,error:true,isLoading: false, errMess: action.payload.message};
        
        case SchedulerType.REGISTER_APPOINTMENT_LOADING :
            return {...state, isLoading: true,  successMess: ""}
        default:
            break;
    }
    return state;
};

export const getAllAppointment= (state = getAllAppointmentState , action) => {
    switch (action.type) {
        case SchedulerType.GET_ALL_APPOINTMENT:
             
            return{...state, error: false,errMess: "", isLoading: false,appointments: action.payload};

        case SchedulerType.GET_ALL_APPOINTMENT_FAIL:

            return{...state,error:true,isLoading: false, errMess: action.payload.message};
        
        case SchedulerType.GET_ALL_APPOINTMENT_LOADING :
            return {...state, isLoading: true,  appointments: []}
        default:
            break;
    }
    return state;
};

export const deleteAppointment= (state = deleteAppointmentState , action) => {
    switch (action.type) {
        case SchedulerType.DELETE_APPOINTMENT_ACTION:
             
            return{...state, error: false,errMess: "",success: action.payload.message};

        case SchedulerType.DELETE_APPOINTMENT_FAIL:

            return{...state,error:true, errMess: action.payload.message};

        default:
            break;
    }
    return state;
};

