//react an router
import React,{useState} from 'react';
import {NavLink,Link, useHistory} from 'react-router-dom'

//styles material ui
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
//icons 
import EventNoteIcon from '@material-ui/icons/EventNote';
import SendIcon from '@material-ui/icons/Send';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PetsIcon from '@material-ui/icons/Pets';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
//redux
import { connect } from 'react-redux';
import { LogOutAuthAction } from '../../redux/actions/AuthAction';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navlink:{
    textDecoration:'none',
    color:'#fff',
    fontFamily:'Gemunu Libre, sans-serif',
    fontSize:'25px'
  },
  AppBar:{
    backgroundColor:"#000"
  }
  
}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: "#fff",
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: "#000"
      },
    },
  },
}))(MenuItem);

const Manager =()=> {
  return(
      <div>
        <Link className="navLink" to="/sign-up" >
            <StyledMenuItem>      
                <ListItemIcon>
                  <SendIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Registrar empleado" style={{ color: '#3D3A39' }}/>          
            </StyledMenuItem>
        </Link>
        <Link className="navLink" to="/employee-management">
            <StyledMenuItem>      
                <ListItemIcon>
                  <EmojiPeopleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="admiinistrar empleados" style={{ color: '#3D3A39' }}/>          
            </StyledMenuItem>
        </Link>
      </div>
  );
};

const Veterinarian =()=>{
  return(
    <div>
      <Link className="navLink" to="/pets-assigned" >
            <StyledMenuItem>    
                <ListItemIcon>
                  <PetsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="mascotas" style={{ color: '#3D3A39' }}/>        
            </StyledMenuItem>
      </Link>
      <Link className="navLink" to="/calendar" >
            <StyledMenuItem>    
                <ListItemIcon>
                <EventNoteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="calendario" style={{ color: '#3D3A39' }}/>        
            </StyledMenuItem>
      </Link>
    </div>
  );
};

const Director = () =>{
  return(
    <div>
      <Link className="navLink" to="/pet-management">
          <StyledMenuItem >
            <ListItemIcon>
              <PetsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="administrar mascotas" style={{ color: '#3D3A39' }}/>
          </StyledMenuItem>
      </Link>
      <Link className="navLink" to="/spa-management">
        <StyledMenuItem>
              <ListItemIcon>
                <EventNoteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="agendamiento para SPA" style={{ color: '#3D3A39' }}/>
        </StyledMenuItem>
      </Link>
    </div>
  );
};
const NavBar = (props)=> {
  const {auth,logout} =props;
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      {/* Barra de navegacion */}
      <div className={classes.root}  >
        <AppBar position="static" className={classes.AppBar}>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
               <NavLink className={classes.navlink} to="/home">SAVE YOUR CHOPET</NavLink>  
            </Typography>
             
             {auth.isLoggedIn === false && <NavLink className={classes.navlink} to="/sign-in">Ingresar</NavLink>}
             {auth.isLoggedIn === true && <Button className={classes.navlink} color="inherit"><Avatar onClick={handleClickUser}><PersonIcon fontSize="medium"/></Avatar></Button>}
          </Toolbar>
          
        </AppBar>
      </div>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        >
         {auth.isLoggedIn === true && auth.user.roles[0] === "ROLE_GERENTE" ? <Manager/>:null}
         {auth.isLoggedIn === true && auth.user.roles[0] === "ROLE_DIRECTOR" ? <Director/> :null}
         {auth.isLoggedIn === true && auth.user.roles[0] === "ROLE_PROFESOR" ? <Veterinarian />:null}
      </StyledMenu>
      
      {/* Menu */}
       <StyledMenu
        id="customized-menu-user"
        anchorEl={anchorElUser}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={handleCloseUser}
        >
        <StyledMenuItem >
          <ListItemIcon>
            <PetsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={`Bienvenido ${auth.user.email}`} style={{ color: '#3D3A39' }}/>
        </StyledMenuItem>
        <StyledMenuItem  onClick={()=>{logout(history); setAnchorElUser(null)}}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Salir" style={{ color: '#3D3A39' }}/>
        </StyledMenuItem>
        </StyledMenu>
    </div>
  );
}

const mapStatetoProps = (state) =>{
  return{
    auth:state.auth
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
      logout:(history) => {
          dispatch(LogOutAuthAction(history)) //manda el historial para que cuando de logout cambie de vista 
      }
  }
}

export default connect(mapStatetoProps,mapDispatchToProps) (NavBar);