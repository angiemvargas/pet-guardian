import './App.css';
//Components 
import Home from './components/Home'
import Login from './components/login/Login'
import RegisterEmployee from './components/manager/registration/RegisterEmployee';
import NavBar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';
import PetsAssigned from './components/veterinarian/PetsAssigned';
import EmployeeManagement  from './components/manager/EmployeeManagement';
import PetManagment from './components/director/managmentPets/PetManagment';
import SpaScheduling from './components/director/sheduleSPA/SpaScheduling'
import Calendar from './components/veterinarian/Calendar';

import PrivateRoute from './components/PrivateRoute';
import {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';




const store = ConfigureStore();

function App() {
  
  return (
    <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <NavBar/>
            <Switch>
              <Route exact path='/sign-in' component={Login}/>
              <Route exact path='/home' component={Home} />
              <PrivateRoute exact path='/sign-up' component={RegisterEmployee} rol={"ROLE_GERENTE"}/>
              <PrivateRoute exact path="/pets-assigned" component={PetsAssigned} rol={"ROLE_PROFESOR"}/>
              <PrivateRoute exact path="/employee-management" component={EmployeeManagement} rol={"ROLE_GERENTE"}/>
              <PrivateRoute exact path="/pet-management" component={PetManagment} rol={"ROLE_DIRECTOR"}/>
              <PrivateRoute exact path="/spa-management" component={SpaScheduling} rol={"ROLE_DIRECTOR"}/>
              <PrivateRoute exact path="/calendar" component={Calendar} rol={"ROLE_PROFESOR"}/>
              <Redirect to='/home'/>
            </Switch>
            <Footer/>
          </BrowserRouter>  
        </Provider> 
    </div>
  );
}


export default App;
