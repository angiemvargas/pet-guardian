import axios from 'axios'

const SchedulerType = {
    REGISTER_APPOINTMENT_SUCCESS:"REGISTER_APPOINTMENT_SUCCESS",
    REGISTER_APPOINTMENT_FAIL:"REGISTER_APPOINTMENT_FAIL",
    REGISTER_APPOINTMENT_LOADING:"REGISTER_APPOINTMENT_LOADING",
    GET_ALL_APPOINTMENT:"GET_ALL_APPOINTMENT",
    GET_ALL_APPOINTMENT_LOADING:"GET_ALL_APPOINTMENT_LOADING",
    GET_ALL_APPOINTMENT_FAIL:"GET_ALL_APPOINTMENT_FAIL",
    DELETE_APPOINTMENT_ACTION:"DELETE_APPOINTMENT_ACTION",
    DELETE_APPOINTMENT_FAIL:"DELETE_APPOINTMENT_FAIL",
}

const RegisterAppointmentAction = (appointmentState) =>{
    return async (dispatch) => {
        dispatch(RegisterAppointmentActionLoading(true));
        try {
            const res = await axios.post("scheduler",appointmentState);
            const {data} = res;
            dispatch({type:SchedulerType.REGISTER_APPOINTMENT_SUCCESS,payload:data});
            window.location.reload()
        } catch (error) {
            console.log(error)
            dispatch({type:SchedulerType.REGISTER_APPOINTMENT_FAIL,payload:error});
        }
    }
}

const RegisterAppointmentActionLoading = () =>({
    type:SchedulerType.REGISTER_APPOINTMENT_LOADING
})

const GetAllAppointment = () =>{
    return async (dispatch)=>{
        dispatch(GetAppointmentActionLoading(true));
        try {
            const res = await axios.get("scheduler");
            const {data} = res;
            dispatch({type:SchedulerType.GET_ALL_APPOINTMENT,payload:data});         
        } catch (error) {
            console.log(error)
            dispatch({type:SchedulerType.GET_ALL_APPOINTMENT_FAIL,payload:error});
        }
    }
}
const DeleteAppointmentAction = (idAppointment) =>{
    return async (dispatch) => {
        try {
            const res = await axios.delete("scheduler/"+idAppointment);
            const {data} =res;
            dispatch({type:SchedulerType.DELETE_APPOINTMENT_ACTION,payload:data});
            window.location.reload()
        } catch (error) {
            console.log(error)
            dispatch({type:SchedulerType.DELETE_APPOINTMENT_FAIL,payload:error});
        }
    }
}


const GetAppointmentActionLoading = () =>({
    type:SchedulerType.GET_ALL_APPOINTMENT_LOADING
})


export {SchedulerType,RegisterAppointmentAction,GetAllAppointment,DeleteAppointmentAction}