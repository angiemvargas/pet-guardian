import {createStore,applyMiddleware,compose, combineReducers} from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { auth } from './reducers/auth';
import {register} from './reducers/register';
import { registerPet,getAllPet,deletePet,searchPet,updatePet } from './reducers/pet';
import { deleteAppointment,getAllAppointment,registerAppointment } from './reducers/scheduler';
import {getAllEmployee,deleteEmployee,searchEmployee,updateEmployee} from './reducers/employee'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            register,
            auth,
            registerPet,
            getAllPet,
            deletePet,
            searchPet,
            updatePet,
            deleteAppointment,
            getAllAppointment,
            registerAppointment,
            getAllEmployee,
            deleteEmployee,
            searchEmployee,
            updateEmployee
        }),
        composeEnhancers(applyMiddleware(thunk,logger))
    );

    return store;
}