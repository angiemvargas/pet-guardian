import React,{useState,useEffect } from 'react'
//components
import DataTable from './PetsTable';
//material ui
import { makeStyles,} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { MenuItem,Select,FormControl,InputLabel,CircularProgress} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

//icons
import PetsIcon from '@material-ui/icons/Pets';
import { useHistory } from 'react-router-dom';
import { GetAllPet, RegisterPetAction } from '../../../redux/actions/PetAction';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin:"2%"

    },
    paper: {
      padding: theme.spacing(4),
      color: theme.palette.text.secondary,

    },
    textField: {

      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      title:{
          margin:6
      }
  }));

const PetManagment = (props) => {
    const history = useHistory();
    const {registerPetState,registerPet,getAllPet,getAllPetState} = props

    useEffect(() => {
        getAllPet();
    },[getAllPet]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const nameInput = e.target.name;
        setPet({
            ...pet,
            [nameInput]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(pet)
        if(pet){
            const newPet = {
                name:pet.name,
                breed:pet.breed,
                weight:pet.weight,
                age:pet.age,
                emailOwner:pet.emailOwner,
                nameOwner:pet.nameOwner,
                address:pet.address,
                place:{
                    city:pet.city,
                    department:pet.department,
                    country:pet.country,
                },
                paymentMethod:pet.paymentMethod,
                isShower:pet.isShower,
                isEducation:pet.isEducation,
                isNursery:pet.isNursery
            }
            registerPet(newPet,history)
        }
           
    }

    const [pet,setPet] = useState({name:'',breed:'',weight:'',age:'',emailOwner:'',nameOwner:'',address:"",city:"",department:"",country:"",paymentMethod:"",isShower:false,isEducation:false,isNursery:false})
    const classes = useStyles();
    return (
        
        <div className={classes.root}>
            <CssBaseline />
            <Typography align='center' variant="h5" className={classes.title}>INGRESO DE MASCOTAS</Typography>
            <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="flex-start" >
                <Grid item xs={12} sm={6} ml={2}>
                    <Paper className={classes.paper}>
                        <React.Fragment>
                            <form onSubmit={handleSubmit}>
                                <Typography variant="h6" gutterBottom>
                                    Informacion de la mascota
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                        required
                                        name="name"
                                        label="Nombre"
                                        id="name"
                                        className={classes.textField}
                                        type="text"
                                        value={pet.name}
                                        onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                        required
                                        name="breed"
                                        label="Raza"
                                        id="breed"
                                        className={classes.textField}
                                        type="text"
                                        value={pet.breed}
                                        onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                        required
                                        name="weight"                                   
                                        id="weight"
                                        value={pet.weight}
                                        onChange={handleChange}
                                        label="Peso Kg"
                                        className={classes.textField}
                                        type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                        required
                                        label="Edad"
                                        name="age"                                   
                                        id="age"
                                        value={pet.age}
                                        onChange={handleChange}
                                        className={classes.textField}
                                        type="number"
                                        />
                                    </Grid>
                                
                                    <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom >
                                        Informacion del propietario
                                    </Typography>
                                        <TextField
                                            required
                                            label="Nombre completo propietario"
                                            name="nameOwner"                                   
                                            id="nameOwner"
                                            value={pet.nameOwner}
                                            onChange={handleChange}
                                            className={classes.textField}
                                            type="text"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            label="Correo electrónico"
                                            name="emailOwner"                                   
                                            id="emailOwner"
                                            value={pet.emailOwner}
                                            onChange={handleChange}
                                            className={classes.textField}
                                            type="email"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            name="country"                                   
                                            id="country"
                                            value={pet.country}
                                            onChange={handleChange}
                                            label="Pais"
                                            fullWidth
                                            autoComplete="shipping country"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField 
                                            required
                                            name="department"                                   
                                            id="department"
                                            value={pet.department}
                                            onChange={handleChange}
                                            label="Departamento" 
                                            fullWidth />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="city"                                   
                                        id="city"
                                        value={pet.city}
                                        onChange={handleChange}
                                        label="Ciudad"
                                        fullWidth
                                    />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        name="address"                                   
                                        id="address"
                                        value={pet.address}
                                        onChange={handleChange}
                                        label="Dirección"
                                        fullWidth
                                    />
                                    </Grid>
                                    <Grid item xs={12}>
                                    <Typography variant="h6" gutterBottom>
                                        Servicios deseados
                                    </Typography>
                                    <FormControlLabel                                    
                                        control={<Checkbox color="secondary" name="isShower" value={pet.isShower}  checked={pet.isShower} onChange={handleChange} />}
                                        label="SPA/BAÑO"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="isNursery" value={pet.isNursery}  checked={pet.isNursery} onChange={handleChange}/>}
                                        label="GUARDERIA"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="isEducation" value={pet.isEducation}  checked={pet.isEducation} onChange={handleChange}/>}
                                        label="EDUCACIÓN"
                                
                                    />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="paymentMethod" >Forma de Pago</InputLabel>
                                            <Select
                                            labelId="paymentMethod"
                                            id="paymentMethod"
                                            fullWidth
                                            required
                                            value={pet.paymentMethod}
                                            onChange={handleChange}
                                            label="Metodo de pago"
                                            name="paymentMethod"
                                            >
                                            <MenuItem value="Efectivo">Efectivo</MenuItem>
                                            <MenuItem value="Cupon">Cupon</MenuItem>
                                            <MenuItem value="Tarjeta Credito">Tarjeta Credito</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {registerPetState.isLoading === true ?<Button variant="contained" color="primary" justify="space-between">
                                            <CircularProgress color="secondary"/> 
                                        </Button> : 
                                        <Button variant="contained" color="primary" type="submit" justify="space-between">
                                            Registrar mascota &nbsp; &nbsp; <PetsIcon fontSize='small'/> 
                                        </Button>}
                                    <Grid item xs={12}>
                                        {registerPetState.error === true && <Alert severity="error">{registerPetState.errMess}</Alert>}
                                        {registerPetState.error === false && <Alert severity="success">{registerPetState.successMess}</Alert>}
                                    </Grid>
                                </Grid>
                            </form>
                        </React.Fragment>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <Grid item xs={12} sm={12}>
                            {getAllPetState.isLoading === true ? <CircularProgress color="secondary"/> : <DataTable/>}
                            {getAllPetState.error === true && <Alert severity="error">{getAllPetState.errMess}</Alert>}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStatetoProps = (state) =>{
    return{
        registerPetState:state.registerPet,
        getAllPetState:state.getAllPet,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        registerPet:(pet,history) => {
            dispatch(RegisterPetAction(pet,history)) 
        },
        getAllPet:() => {
            dispatch(GetAllPet()) 
        },
       
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(PetManagment)
