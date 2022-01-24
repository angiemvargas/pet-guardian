import {PetType} from '../actions/PetAction'

const registerPetState = {
    isLoading:false,
    error:null,
    errMess:"",
    successMess:"",
}

const updatePetState = {
    isLoading:false,
    error:null,
    errMess:"",
    successMess:"",
}

const getAllpetState = {
    pets:[],
    isLoading:false,
    error:null,
    errMess:"",
}

const deletePetState = {
    success:"",
    error:null,
    errMess:"",
}

const searchPetState ={
    pet:[],
    isLoading:false,
    error:null,
    errMess:"",
}
export const registerPet= (state = registerPetState , action) => {
    switch (action.type) {
        case PetType.REGISTER_PET_SUCCESS:
             
            return{...state, error: false,errMess: "", isLoading: false,successMess: action.payload.message};

        case PetType.REGISTER_PET_FAIL:

            return{...state,error:true,isLoading: false, errMess: action.payload.message};
        
        case PetType.REGISTER_PET_LOADING :
            return {...state, isLoading: true,  successMess: ""}
        default:
            break;
    }
    return state;
};

export const getAllPet= (state = getAllpetState , action) => {
    switch (action.type) {
        case PetType.GET_ALL_PET:
             
            return{...state, error: false,errMess: "", isLoading: false,pets: action.payload};

        case PetType.GET_ALL_PET_FAIL:

            return{...state,error:true,isLoading: false, errMess: action.payload.message};
        
        case PetType.GET_ALL_PET_LOADING :
            return {...state, isLoading: true,  pets: []}
        default:
            break;
    }
    return state;
};

export const deletePet= (state = deletePetState , action) => {
    switch (action.type) {
        case PetType.DELETE_PET_ACTION:
             
            return{...state, error: false,errMess: "",success: action.payload.message};

        case PetType.DELETE_PET_FAIL:

            return{...state,error:true, errMess: action.payload.message};

        default:
            break;
    }
    return state;
};


export const searchPet= (state = searchPetState , action) => {
    switch (action.type) {
        case PetType.SEARCH_PET:
             
            return{...state, error: false,errMess: "",pet: action.payload};

        case PetType.SEARCH_PET_FAIL:

            return{...state,error:true, errMess: action.payload.message};

        default:
            break;
    }
    return state;
};

export const updatePet= (state = updatePetState , action) => {
    switch (action.type) {
        case PetType.UPDATE_PET_SUCCESS:
             
            return{...state, error: false,errMess: "", isLoading: false,successMess: action.payload.message};

        case PetType.UPDATE_PET_FAIL:

            return{...state,error:true,isLoading: false, errMess: action.payload.message};
        
        case PetType.UPDATE_PET_LOADING :
            return {...state, isLoading: true,  successMess: ""}
        default:
            break;
    }
    return state;
};
