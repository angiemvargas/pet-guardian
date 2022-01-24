import { connect } from 'react-redux'
import {Route,Redirect} from 'react-router-dom'

const PrivateRoute = (props) => {
    const {auth} = props;
    const Component = props.component;
    return <Route exact={props.exact} path={props.path} >{auth.isLoggedIn === true && auth.user.roles[0] === props.rol ? <Component/> : <Redirect to='/home'/>}</Route>
}


const mapStatetoProps = (state) =>{
    return{
      auth:state.auth
    }
  }
export default connect(mapStatetoProps)(PrivateRoute)
