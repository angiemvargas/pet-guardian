import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles,} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux'
import { GetAllPet, SearchPetByID, UpdatePetAction} from '../../redux/actions/PetAction';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin:"2%"
  
    },
    paper: {
      padding: theme.spacing(4),
      color: theme.palette.text.secondary,
      height:"70vh",
      margin:"1%"
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
      DatePet:{
        fontWeightMedium: 500,
        fontWeight: "bold",
      }
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
  

const PetsAssigned = (props) => {
    const {getAllPetState,getAllPet,searchPet,searchPetState,updatePet} = props
    const history = useHistory();
    const classes = useStyles();
    const [select, setSelection] = React.useState([]);
    const [notificationMenu,setNotificationMenu] = React.useState({nursery:false,education:false,spa:false})
    const [pet,setPet] = React.useState({noveltySpa:'',noveltyEducation:'',noveltyNursery:''})

    React.useEffect(() => {
        if(select.length === 1){
            searchPet(select[0])
          }else{
            setNotificationMenu({
                nursery:false,
                education:false,
                spa:false
            })
          }
    }, [select,searchPet]);
    
    React.useEffect(()=>{
        getAllPet();
    },[getAllPet])
    
    const handleRowSelection = (e) => {
        console.log(e);
        const value = e
        setSelection(value);
    }
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


    const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const nameInput = e.target.name;
    setPet({
        ...pet,
        [nameInput]: value
    })
    }
    
    const Nursery = () =>{
        return(
            <div>
                <p>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.</p>
                <form onSubmit={nurseryNotification}>
                    <Grid item xs={12} sm={12}>
                        <TextField                       
                        id="noveltyNursery"
                        name="noveltyNursery"
                        variant="filled"
                        onChange={handleChange}
                        value={pet.noveltyNursery}
                        label="Novedad Guarderia"
                        fullWidth
                        autoFocus
                        />
                    </Grid>
                    <br />
                    <br />
                    <Button variant="contained" color="dark" justify="center" fullWidth>
                        Guardar notificación
                    </Button>
                </form>
            </div>
        )
    }
    const  Education = () =>{
        return(
            <div>
                <p>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.</p>
                <form onSubmit={educationNotification}>
                    <TextField
                    id="noveltyEducation"
                    name="noveltyEducation"
                    variant="filled"
                    onChange={handleChange}
                    value={pet.noveltyEducation}
                    label="Novedad Educacion"
                    fullWidth
                    autoFocus
                    />
                    <br />
                    <br />
                    <Button variant="contained" color="dark" justify="center" type="submit" fullWidth>
                        Guardar notificación
                    </Button>
                </form>
            </div>
        )
    }
    const  SPA = () =>{
        return(
            <div>
                <p>Especificaciones</p> 
                {searchPetState.pet.specifications && 
                    searchPetState.pet.specifications.map((element)=>{
                    return(
                    <p>{element.name}</p>
                    )
                })}
                <form onSubmit={spaNotification}>
                    <TextField
                    id="noveltySpa"
                    name="noveltySpa"
                    variant="filled"
                    onChange={handleChange}
                    value={pet.noveltySpa}
                    label="Novedad SPA"
                    fullWidth
                    autoFocus
                    />
                    <br />
                    <br />
                    <Button variant="contained" color="dark" justify="center"  type="submit" fullWidth>
                        Guardar notificación
                    </Button>
                </form>
            </div>
        )
    }

    const spaNotification = (event) =>{
        console.log(pet)
        if(pet){
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
                noveltySpa:pet.noveltySpa,
                noveltyEducation: searchPetState.pet.noveltyEducation,
                noveltyNursery:searchPetState.pet.noveltyNursery,
                specifications:searchPetState.pet.specifications
            }
            updatePet(petUpdate,history)
        }
    }
    const educationNotification = (event) =>{
        console.log(pet)
        if(pet){
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
                noveltyEducation:pet.noveltyEducation,
                noveltyNursery:searchPetState.pet.noveltyNursery,
                specifications:searchPetState.pet.specifications
            }
            console.log(petUpdate)
            updatePet(petUpdate,history)
        }
    }
    const nurseryNotification = (event) =>{
        console.log(pet)
        if(pet){
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
                noveltyEducation:searchPetState.pet.noveltyEducation,
                noveltyNursery:pet.noveltyNursery,
                specifications:searchPetState.pet.specifications
            }
            updatePet(petUpdate,history)
        }
    }
    const isEducation = () => {
        setNotificationMenu({
            nursery:false,
            education:true,
            spa:false
        })
    }
    const isSPA= () => {
        setNotificationMenu({
            nursery:false,
            education:false,
            spa:true
        })
    }
    const isNursery = () => {
        setNotificationMenu({
            nursery:true,
            education:false,
            spa:false
        })
    }
    return (
        <div>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" >
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            checkboxSelection
                            onSelectionModelChange = {handleRowSelection}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {select.length === 1 && <Paper className={classes.paper}>
                        <Typography variant="h4" align="center" className={classes.DatePet}>Datos de mascota</Typography>
                        <br />
                        <Typography variant="h6" >Nombre: {searchPetState.pet.name}</Typography>
                        <Typography variant="h6">Raza: {searchPetState.pet.breed}</Typography> 
                        <br />
                        <br />
                        <Box align="center" display="flex" >
                            {searchPetState.pet.isEducation === true && <Button variant="contained" color="dark" justify="center" onClick={isEducation}>
                                Educacion
                            </Button>}
                            {searchPetState.pet.isShower === true && <Button variant="contained" color="dark" justify="center" onClick={isSPA} >
                                SPA
                            </Button>}
                            {searchPetState.pet.isNursery === true && <Button variant="contained" color="dark" justify="center" onClick={isNursery}>
                                Guarderia
                            </Button>}
                        </Box> 
                        {notificationMenu.nursery === true && <Nursery/>}  
                        {notificationMenu.education === true && <Education/>}
                        {notificationMenu.spa === true && <SPA/>}    
                    </Paper>}
                </Grid>
            </Grid>
           </div>
    )
}

const mapStatetoProps = (state) =>{
    return{
        getAllPetState:state.getAllPet,
        searchPetState:state.searchPet
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return {
        getAllPet:() => {
            dispatch(GetAllPet()) 
        },
        searchPet:(idPet) => {
            dispatch(SearchPetByID(idPet)) 
        },
        updatePet:(petUpdate) => {
            dispatch(UpdatePetAction(petUpdate)) 
          },     
    }
  }

export default connect(mapStatetoProps,mapDispatchToProps)(PetsAssigned)
