import axios from 'axios'

const PetType = {
    REGISTER_PET_SUCCESS:"REGISTER_PET_SUCCESS",
    REGISTER_PET_FAIL:"REGISTER_PET_FAIL",
    REGISTER_PET_LOADING:"REGISTER_PET_LOADING",
    GET_ALL_PET:"GET_ALL_PET",
    GET_ALL_PET_LOADING:"GET_ALL_PET_LOADING",
    GET_ALL_PET_FAIL:"GET_ALL_PET_FAIL",
    DELETE_PET_ACTION:"DELETE_PET_ACTION",
    DELETE_PET_FAIL:"DELETE_PET_FAIL",
    SEARCH_PET:"SEARCH_PET",
    SEARCH_PET_FAIL:"SEARCH_PET_FAIL",
    UPDATE_PET_SUCCESS:"UPDATE_PET_SUCCESS",
    UPDATE_PET_FAIL:"UPDATE_PET_FAIL",
    UPDATE_PET_LOADING:"UPDATE_PET_LOADING"
}

const RegisterPetAction = (petState,history) =>{
    return async (dispatch) => {
        dispatch(RegisterPetActionLoading(true));
        try {
            const res = await axios.post("pet",petState);
            const {data} = res;
            console.log(data);
            dispatch({type:PetType.REGISTER_PET_SUCCESS,payload:data});
            history.push("/pet-management")
        } catch (error) {
            console.log(error)
            dispatch({type:PetType.REGISTER_PET_FAIL,payload:error});
        }
    }
}

const RegisterPetActionLoading = () =>({
    type:PetType.REGISTER_PET_LOADING
})

const GetAllPet = () =>{
    return async (dispatch)=>{
        dispatch(GetPetActionLoading(true));
        try {
            const res = await axios.get("pet");
            const {data} = res;
            console.log(data);
            dispatch({type:PetType.GET_ALL_PET,payload:data});           
        } catch (error) {
            console.log(error)
            dispatch({type:PetType.GET_ALL_PET_FAIL,payload:error});
        }
    }
}
const DeletePetAction = (idPet,history) =>{
    return async (dispatch) => {
        try {
            const res = await axios.delete("pet/"+idPet);
            const {data} =res;
            console.log(data);
            dispatch({type:PetType.DELETE_PET_ACTION,payload:data});
            history.push("/pet-management")
        } catch (error) {
            console.log(error)
            dispatch({type:PetType.DELETE_PET_FAIL,payload:error});
        }
    }
}

const SearchPetByID = (idPet) =>{
    return async (dispatch)=>{
        try {
            const res = await axios.get("pet/search/"+idPet);
            const {data} = res;
            console.log(data);
            dispatch({type:PetType.SEARCH_PET,payload:data});           
        } catch (error) {
            console.log(error)
            dispatch({type:PetType.SEARCH_PET_FAIL,payload:error});
        }
    }
}

const UpdatePetAction = (petState,history) =>{
    return async (dispatch) => {
        dispatch(UpdatePetActionLoading(true));
        try {
            const res = await axios.put("pet",petState);
            const {data} = res;
            console.log(data);
            dispatch({type:PetType.UPDATE_PET_SUCCESS,payload:data});
            history.push("/pet-management")
        } catch (error) {
            console.log(error)
            dispatch({type:PetType.UPDATE_PET_FAIL,payload:error});
        }
    }
}

const UpdatePetActionLoading = () =>({
    type:PetType.UPDATE_PET_LOADING
})

const GetPetActionLoading = () =>({
    type:PetType.GET_ALL_PET_LOADING
})

export {PetType,RegisterPetAction,GetAllPet,DeletePetAction,SearchPetByID,UpdatePetAction}