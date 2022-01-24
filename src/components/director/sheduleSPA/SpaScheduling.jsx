import React,{useState,useEffect } from 'react'
//material ui
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography,TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { MenuItem,Select,FormControl,InputLabel} from '@material-ui/core';
import moment from 'moment';
import { CircularProgress} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'

//icons
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

//scheduler
import { ViewState,EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  Resources,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

//redux
import { connect } from 'react-redux';
import { DeleteAppointmentAction, GetAllAppointment, RegisterAppointmentAction } from '../../../redux/actions/SchedulerAction';
import { SearchPetByID, UpdatePetAction } from '../../../redux/actions/PetAction';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    overflow:'hidden',
    
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height:'100vh',
    width:'50vw',
    overflow: 'scroll',
    '@media(max-width: 700px)' : {
      width: '100vw'
    }
  },
  table: {
    minWidth: '100%',
    marginTop:'4%',
  },
  paperTble: {
    width: '100%',
    marginBottom: theme.spacing(2),
   
  },
  title:{
    marginTop:'4%',
    marginBottom:'4%'
  },
  buttonNewSPA:{
    marginTop:"30%",
    display:"flex",
    justifyContent: "center",
    alignItems:"center"
  }
}));



const SpaScheduling = (props) => {
  const {getAllAppointmentState,registerAppointmentState,getAllAppointment,searchPetState,searchPet,registerAppointment,deleteAppointment,updatePet} = props;
  const [currentDate,setCurrentDate] = useState(new Date());
  const [resources] = useState([{fieldName: 'location',title: 'Location',instances: [{ id: 'Room 1', text: 'Guarderia central' }]},{fieldName: 'members',title: 'Members',instances: [{ id: 'Manuel Calle Garces', text: 'Manuel Calle Garces' },{id: 'Angie Castañeda', text: 'Angie Castañeda'},{id: 'Alejandro Muñoz', text: 'Alejandro Muñoz'},{id: 'Chope', text: 'Chope'}]}]);
  const [open,setOpen] =useState(false);
  const [appointmentForm,setAppointmentForm] = useState({title:"",date:moment(new Date()).format("aaaa-MM-ddThh:mm"),hour:"",teacher:"",search:""});
  const [appointmentSpecifications,setAppointmentSpecifications] = useState([])
  const classes = useStyles();
 
  const petSearch = (e) =>{
    if(appointmentForm.search !== ""){
      searchPet(appointmentForm.search); 
    }
  }

  useEffect(() => {
    getAllAppointment();

  }, [getAllAppointment,searchPet]);
  


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    
  };

  const currentDateChange = (currentDate) => { setCurrentDate( currentDate ); };


  const commitChanges = ({ added, changed, deleted }) => {
      if (added) {
        console.log("Hola mundo")
      }
      if (changed) {
        console.log("Change")
      }
      if (deleted !== undefined) {
        deleteAppointment(deleted)
      }

  };
  

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const nameInput = e.target.name;
    setAppointmentForm({
        ...appointmentForm,
        [nameInput]: value
    })
  }

const handleChangeSpecifications= (e)=>{
  const value = e.target.type === 'checkbox' ? e.target.value : e.target.checked;
  const specificationsDif = appointmentSpecifications.filter((specification)=>specification.cod === value)
  if (specificationsDif.length === 0) {
    setAppointmentSpecifications([
      ...appointmentSpecifications,{
        cod:value
      }])
  }else{
    const Newspecifications= appointmentSpecifications.filter((specification)=>specification.cod !== value)
    setAppointmentSpecifications(Newspecifications)
  }
}
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(appointmentForm)     
    console.log(appointmentSpecifications)  
    const date = new Date(appointmentForm.date)
    if(appointmentForm){
      const newAppointment = {
          title:appointmentForm.title,
          date:date,
          hour:5,
          teacher:appointmentForm.teacher,
          idPet:searchPetState.pet.id,
          namePet:searchPetState.pet.name
      }
      const petUpdate = {
        id:searchPetState.pet.id,
        name:searchPetState.pet.name,
        breed:searchPetState.pet.breed,
        weight:searchPetState.pet.weight,
        age:searchPetState.pet.age,
        emailOwner:searchPetState.pet.emailOwner,
        nameOwner:searchPetState.pet.nameOwner,
        address:searchPetState.pet.address,
        place:{
            city:searchPetState.pet.city,
            department:searchPetState.pet.department,
            country:searchPetState.pet.country,
        },
        paymentMethod:searchPetState.pet.paymentMethod,
        isShower:searchPetState.pet.isShower,
        isEducation:searchPetState.pet.isEducation,
        isNursery:searchPetState.pet.isNursery,
        noveltySpa:searchPetState.pet.noveltySpa,
        noveltyEducation: searchPetState.pet.noveltyEducation,
        noveltyNursery:searchPetState.pet.noveltyNursery,
        specifications:appointmentSpecifications
      }
      updatePet(petUpdate)
      registerAppointment(newAppointment);
      setOpen(false);
   }
  }

  const appointments = []; 

  getAllAppointmentState.appointments.forEach((element,i) => {
    const dateSchedule = new Date(element.date)
    appointments[i]={     
      title: element.title,
      startDate: new Date(dateSchedule.getFullYear(),dateSchedule.getMonth(),dateSchedule.getDate(),dateSchedule.getHours(),dateSchedule.getMinutes(),dateSchedule.getSeconds()),
      endDate: new Date(dateSchedule.getFullYear(),dateSchedule.getMonth(),dateSchedule.getDate(),dateSchedule.getHours()+1,dateSchedule.getMinutes(),dateSchedule.getSeconds()),
      id: element.id,
      location: 'Room 1',
      members:element.teacher,
    }
  }); 


  return(
    <Grid container spacing={0} direction="row" justifyContent="flex-start" alignItems="flex-start" >
        <Grid item xs={12} sm={3}>
          <div className={classes.buttonNewSPA} >
            <Button variant="contained" color="primary" type="button" onClick={handleOpen}>Nueva cita</Button>  
          </div>   
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Paper>
              <Fade in={open}>
                <div className={classes.paper}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} xs={12}>
                      <Grid item xs={12} sm={9}>
                      <Button onClick={handleClose}>
                            <ClearIcon fontSize="small"/>
                        </Button>       
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        {registerAppointmentState.isLoading === true ? <CircularProgress color="secondary"/> : 
                        <Button variant="contained" color="primary" type="submit">
                            AGENDAR
                        </Button>  }
                                   
                      </Grid>
                      <Grid item xs={12}>  
                      <Typography className={classes.title}>
                              HORARIO
                        </Typography> 
                        <TextField
                            label="Titulo"
                            id="title"
                            type="text"
                            name="title"
                            variant="filled"
                            fullWidth
                            value={appointmentForm.title}
                            onChange={handleChange}
                        />
                      </Grid>
                        <Grid item xs={12} >
                        <TextField
                          id="date"
                          label="Fecha de cita"
                          name="date"
                          type="datetime-local"
                          format={'aaaa-MM-ddThh:mm'}
                          defaultValue={appointmentForm.date}
                          sx={{ width: 250 }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={appointmentForm.date}
                          onChange={handleChange}
                        />       
                        </Grid>
                        <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="paymentMethod" >Encargado</InputLabel>
                            <Select
                            labelId="paymentMethod"
                            id="teacher"
                            fullWidth
                            required
                            value={appointmentForm.teacher}
                            onChange={handleChange}
                            label="Encargado"
                            name="teacher"
                            >
                            <MenuItem value="Manuel Calle Garces">Manuel Calle Garces</MenuItem>
                            <MenuItem value="Angie Castañeda">Angie Castañeda</MenuItem>
                            <MenuItem value="Alejandro Muñoz">Alejandro Muñoz</MenuItem>
                            <MenuItem value="Chope">Chope</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid >
                      <Grid item xs={12}>
                        <Typography className={classes.title}>
                            DATOS MASCOTA
                        </Typography>
                        <Grid container spacing={1} xs={12}>                           
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    required
                                    placeholder="Buscar..."
                                    id="search"
                                    name="search"
                                    type="text"
                                    fullWidth
                                    value={appointmentForm.search}
                                    onChange={handleChange}

                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button variant="contained" color="primary" type="button" onClick={petSearch}>
                                    <SearchIcon fontSize="small"/>
                                </Button>
                            </Grid>                          
                        </Grid>
                        <Paper className={classes.paperTable}>
                          <Grid item xs={12} sm={12}>                               
                            <TableContainer component={Paper}>
                              <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="left">NOMBRE</TableCell>
                                    <TableCell align="left">RAZA</TableCell>
                                    <TableCell align="left">PESO</TableCell>
                                    <TableCell align="left">EDAD</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={searchPetState.pet.id}>
                                      <TableCell component="th" scope="row">
                                        {searchPetState.pet.id}
                                      </TableCell>
                                      <TableCell align="left">{searchPetState.pet.name}</TableCell>
                                      <TableCell align="left">{searchPetState.pet.breed}</TableCell>
                                      <TableCell align="left">{searchPetState.pet.weight}</TableCell>
                                      <TableCell align="left">{searchPetState.pet.age}</TableCell>
                                    </TableRow>
                                </TableBody>
                              </Table>
                            </TableContainer>             
                          </Grid>
                        </Paper>     
                        <Typography className={classes.title}>
                            ESPECIFICACIONES
                        </Typography>       
                          <Grid item xs={12}>
                            <FormControlLabel                                    
                                control={<Checkbox color="secondary" name="1" value="1" onChange={handleChangeSpecifications} />}
                                label="Pintar garritas"
                            />
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="2"  value="2" onChange={handleChangeSpecifications}/>}
                                label="Agregar pañuelo"
                            />
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="3"  value="3" onChange={handleChangeSpecifications}/>}
                                label="Cepillar dientes"
                        
                            />
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="4"  value="4" onChange={handleChangeSpecifications}/>}
                                label="Corte de pelo"
                        
                            />
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="5"  value="5" onChange={handleChangeSpecifications}/>}
                                label="Locion"
                        
                            />
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="6" value="6"  onChange={handleChangeSpecifications}/>}
                                label="Purgar"
                        
                            />
                          </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </div>
              </Fade>
            </Paper>
          </Modal>
        </Grid>
      <Grid item xs={12} sm={9}> 
      {getAllAppointmentState.isLoading === true ? <CircularProgress color="secondary"/> :
          <Paper>
            <Scheduler
              data={appointments}
              height={660}
            >
              <ViewState
                currentDate={currentDate}
                onCurrentDateChange={currentDateChange}
              />
              <EditingState
                onCommitChanges={commitChanges}
              />
              <IntegratedEditing />
              <WeekView
                startDayHour={9}
                endDayHour={19}
              />
              <Toolbar />
              <DateNavigator />
              <TodayButton />
              <Appointments /> 
              <AppointmentTooltip 
                showDeleteButton
              />
              <Resources
                data={resources}
              />
            </Scheduler>
          </Paper>}
        </Grid>
    </Grid>
  );
  
}



const mapStateToProps = (state) =>{
  return{
      registerAppointmentState:state.registerAppointment,
      getAllAppointmentState:state.getAllAppointment,
      searchPetState:state.searchPet
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
      getAllAppointment:() => {
          dispatch(GetAllAppointment()) 
      },
      searchPet:(idPet) => {
        dispatch(SearchPetByID(idPet)) 
      },  
      registerAppointment:(newAppointment)=>{
        dispatch(RegisterAppointmentAction(newAppointment))
      },
      deleteAppointment:(idAppointment)=>{
        dispatch(DeleteAppointmentAction(idAppointment))
      },
      updatePet:(petUpdate) => {
        dispatch(UpdatePetAction(petUpdate)) 
      }, 
     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpaScheduling);