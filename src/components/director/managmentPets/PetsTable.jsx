import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import {Alert} from '@material-ui/lab';
import { makeStyles,} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import { MenuItem,Select,FormControl,InputLabel,CircularProgress} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Collapse from '@material-ui/core/Collapse';

import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux'
import { DeletePetAction, SearchPetByID, UpdatePetAction } from '../../../redux/actions/PetAction';
import { useHistory } from 'react-router-dom';


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
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      overflow:'hidden',
      
    },
    paper2: {
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
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 250,},
  {
    field: 'name',
    headerName: 'NOMBRE DE MASCOTA',
    editable: true,
    width: 250,
  },
  {
    field: 'age',
    headerName: 'EDAD',
    type: 'number',
    width: 120,
    editable: true,
  },
  {
    field: 'breed',
    headerName: 'RAZA',
    type: 'number',
    width: 120,
    editable: true,
  },
  {
    field: 'weight',
    headerName: 'PESO',
    type: 'number',
    width: 120,
    editable: true,
  },
  {
    field: 'isEducation',
    headerName: 'SERVICIO EDUCACION',
    width:  220,
    editable: true,
  },{ 
    field: 'isNursery',
    headerName: 'SERVICIO GUARDERIA',
    width:  220,
    editable: true,
  },
  { 
    field: 'isShower',
    headerName: 'SERVICIO SPA/BAÑO',
    width:  220,
    editable: true,
  },
  {
    field: 'nameOwner',
    headerName: 'NOMBRE DEL PROPIETARIO',
    sortable: true,
    width: 250,
  },
  {
    field: 'emailOwner',
    headerName: 'CORREO DEL PROPIETARIO',
    width: 260,
    editable: true,
  },

];



function DataTable(props) {
  
  const {getAllPetState,deletePetState,deletePet,searchPet,searchPetState,updatePet,updatePetState} = props
  const history = useHistory();
  const [select, setSelection] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [pet,setPet] = React.useState({id:'',name:'',breed:'',weight:'',age:'',emailOwner:'',nameOwner:'',address:"",city:"",department:"",country:"",paymentMethod:"",isShower:false,isEducation:false,isNursery:false})
  const classes = useStyles();

  const handleRowSelection = (e) => {
    console.log(e);
    const value = e
    setSelection(value);
  }
  const handleDeletePet = () =>{
    select.forEach(element=>{
      deletePet(element,history)
    })
      
  }

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
        const petUpdate = {
            id:pet.id,
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
            isNursery:pet.isNursery,
            noveltySpa:searchPetState.pet.noveltySpa,
            noveltyEducation: searchPetState.pet.noveltyEducation,
            noveltyNursery:searchPetState.pet.noveltyNursery,
            specifications:searchPetState.pet.specifications
        }
        updatePet(petUpdate,history)
        setOpen(false);
        setOpenAlert(true);
    }
  }


  const handleOpen = () => {
    setPet({
      id:searchPetState.pet.id,
      name:searchPetState.pet.name,
      breed:searchPetState.pet.breed,
      weight:searchPetState.pet.weight,
      age:searchPetState.pet.age,
      emailOwner:searchPetState.pet.emailOwner,
      nameOwner:searchPetState.pet.nameOwner,
      address:searchPetState.pet.address,
      city:searchPetState.pet.place.city,
      department:searchPetState.pet.place.department,
      country:searchPetState.pet.place.country,
      paymentMethod:searchPetState.pet.paymentMethod,
      isShower:searchPetState.pet.isShower,
      isEducation:searchPetState.pet.isEducation,
      isNursery:searchPetState.pet.isNursery
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if(select.length === 1){
      searchPet(select[0])
    }
  }, [select,searchPet]);


  const rows = [];

  getAllPetState.pets.forEach((element)=>{
    rows.push({
      id:element.id,
      name:element.name,
      emailOwner:element.emailOwner,
      nameOwner:element.nameOwner,
      isShower:element.isShower,
      isNursery:element.isNursery,
      isEducation:element.isEducation,
      breed:element.breed,
      age:element.age,
      weight:element.weight
    });
  });

  return (
    <div style={{height:'100vh', width: '100%' }}>
      {select.length ? <Button variant="contained" color="primary" type="button" mx="auto" onClick={handleDeletePet}><DeleteIcon/></Button> : ""}
      {select.length ===1 ? <Button variant="contained" color="primary" type="button" className="editPet" onClick={handleOpen}><EditIcon/></Button> : ""}
      {deletePetState.error === true && <Alert severity="error">{deletePetState.errMess}</Alert>}
      {deletePetState.error === false && <Alert severity="success">{deletePetState.success}</Alert>}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        onSelectionModelChange = {handleRowSelection}
      />
      {updatePetState.error === true &&<Collapse in={openAlert}> <Alert severity="error" 
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
    >{updatePetState.errMess }</Alert> </Collapse>}
      {updatePetState.error === false && <Collapse in={openAlert}><Alert severity="success" 
           action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>{updatePetState.successMess}</Alert> </Collapse> }
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
            <Paper className={classes.paper2}>
                        <React.Fragment>
                        <Button onClick={handleClose} className="editPet">
                            <ClearIcon fontSize="small"/>
                        </Button> 
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
                                        control={<Checkbox color="secondary" name="isShower"  value={pet.isShower} checked={pet.isShower} onChange={handleChange} />}
                                        label="SPA/BAÑO"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox color="secondary" name="isNursery"  value={pet.isNursery}  checked={pet.isNursery} onChange={handleChange}/>}
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
                                    {updatePetState.isLoading === true ?<Button variant="contained" color="primary"justify="space-between">
                                            <CircularProgress color="secondary"/> 
                                        </Button> :                                    
                                         <Button variant="contained" color="primary" type="submit" justify="space-between">
                                            Actualizar mascota 
                                        </Button>}
                                    <Grid item xs={12}>
                                    </Grid>
                                </Grid>
                            </form>
                        </React.Fragment>
                    </Paper>
          </Modal>
    </div>


  );
}


const mapStatetoProps = (state) =>{
  return{
      getAllPetState:state.getAllPet,
      deletePetState:state.deletePet,
      searchPetState:state.searchPet,
      updatePetState:state.updatePet
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
      deletePet:(idPet,history) => {
          dispatch(DeletePetAction(idPet,history)) 
      }, 
      searchPet:(idPet) => {
        dispatch(SearchPetByID(idPet)) 
      },  
      updatePet:(petUpdate,history) => {
        dispatch(UpdatePetAction(petUpdate,history)) 
      },     
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(DataTable)