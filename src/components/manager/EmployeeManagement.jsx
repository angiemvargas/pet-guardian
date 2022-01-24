import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import {Alert} from '@material-ui/lab';
import { makeStyles,} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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
import { useHistory } from 'react-router-dom';
import { DeleteEmployeeAction, GetAllEmployee, SearchEmployeeByID, UpdateEmployeeAction } from '../../redux/actions/EmployeeAction';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      margin:"2%"
  
    },
    paper: {
      width:"80%",
      margin:"5%",
      height:"100vh",
      marginLeft:"10%",
      display: "flex",
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
      delete:{
        float:"left"
      }
  }));
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 250,},
    {
      field: 'firstName',
      headerName: 'NOMBRE',
      editable: true,
      width: 250,
    },
    {
      field: 'lastName',
      headerName: 'APELLIDO',
      width: 220,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      width: 220,
      editable: true,
    },
    {
      field: 'document',
      headerName: 'DOCUMENTO',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'EDAD',
      type: 'number',
      width:  120,
      editable: true,
    },{ 
      field: 'eps',
      headerName: 'EPS',
      width:  120,
      editable: true,
    },
    { 
      field: 'salary',
      headerName: 'SALARIO',
      width:  150,
      editable: true,
    }
  ];
  
  
const EmployeeManagement = (props) => {
  const {getAllEmployeeState,deleteEmployeeState,deleteEmployee,searchEmployee,searchEmployeeState,updateEmployee,updateEmployeeState,getAllEmployee} = props
  const history = useHistory();
  const [select, setSelection] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [employee,setEmployee] = React.useState({id:'',firstName:'',lastName:'',email:'',document:'',age:'',eps:'',address:"",salary:"",rol:""})
  const classes = useStyles();

  const handleRowSelection = (e) => {
    console.log(e);
    const value = e
    setSelection(value);
  }
  const handleDeleteEmployee = () =>{
    select.forEach(element=>{
      deleteEmployee(element,history)
    })
      
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const nameInput = e.target.name;
    setEmployee({
        ...employee,
        [nameInput]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(employee)
    if(employee){
        const employeeUpdate = {
            id:employee.id,
            firstName:employee.firstName,
            lastName:employee.lastName,
            email:employee.email,
            age:employee.age,
            document:employee.document,
            eps:employee.eps,
            salary:employee.salary,
            rol:employee.rol,
        }
        updateEmployee(employeeUpdate,history)
        setOpen(false);
        setOpenAlert(true);
    }
  }


  const handleOpen = () => {
    console.log(searchEmployeeState.employee.roles[0].name)
    if (searchEmployeeState.employee.roles[0].name === "ROLE_DIRECTOR") {
        setEmployee({
          id:searchEmployeeState.employee.id,
          firstName:searchEmployeeState.employee.firstName,
          lastName:searchEmployeeState.employee.lastName,
          email:searchEmployeeState.employee.email,
          age:searchEmployeeState.employee.age,
          document:searchEmployeeState.employee.document,
          eps:searchEmployeeState.employee.eps,
          salary:searchEmployeeState.employee.salary,
          rol:"director"
        })
    }else if (searchEmployeeState.employee.roles[0].name === "ROLE_GERENTE"){
        setEmployee({
          id:searchEmployeeState.employee.id,
          firstName:searchEmployeeState.employee.firstName,
          lastName:searchEmployeeState.employee.lastName,
          email:searchEmployeeState.employee.email,
          age:searchEmployeeState.employee.age,
          document:searchEmployeeState.employee.document,
          eps:searchEmployeeState.employee.eps,
          salary:searchEmployeeState.employee.salary,
          rol:"gerente"
        })
    }else if (searchEmployeeState.employee.roles[0].name === "ROLE_PROFESOR"){
        setEmployee({
          id:searchEmployeeState.employee.id,
          firstName:searchEmployeeState.employee.firstName,
          lastName:searchEmployeeState.employee.lastName,
          email:searchEmployeeState.employee.email,
          age:searchEmployeeState.employee.age,
          document:searchEmployeeState.employee.document,
          eps:searchEmployeeState.employee.eps,
          salary:searchEmployeeState.employee.salary,
          rol:"profesor"
        })
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(()=>{
    getAllEmployee();
  },[getAllEmployee])

  React.useEffect(() => {
    if(select.length === 1){
      searchEmployee(select[0])
    }
  }, [select,searchEmployee]);

  
  const rows = [];

  getAllEmployeeState.employees.forEach((element)=>{
    rows.push({
      id:element.id,
      firstName:element.firstName,
      lastName:element.lastName,
      email:element.email,
      document:element.document,
      age:element.age,
      eps:element.eps,
      salary:element.salary,
    });
  });
    return (
        <div style={{height:'100vh', width: '100%' }}>
            <Paper className={classes.paper} align="center">
                <Grid item xs={12} sm={12} align="center">
                    {select.length ? <Button variant="contained" color="primary" type="button"  mx="auto" className={classes.delete} onClick={handleDeleteEmployee}><DeleteIcon/></Button> : ""}
                    {select.length ===1 ? <Button variant="contained" color="primary" type="button" className="editPet" onClick={handleOpen}><EditIcon/></Button> : ""}
                    <br />
                    <br />
                    {deleteEmployeeState.error === true && <Alert severity="error">{deleteEmployeeState.errMess}</Alert>}
                    {deleteEmployeeState.error === false && <Alert severity="success">{deleteEmployeeState.success}</Alert>}
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                        onSelectionModelChange = {handleRowSelection}
                    />
                    {updateEmployeeState.error === true &&<Collapse in={openAlert}> <Alert severity="error" 
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
                    >{updateEmployeeState.errMess }</Alert> </Collapse>}
                    {updateEmployeeState.error === false && <Collapse in={openAlert}><Alert severity="success" 
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
                        }>{updateEmployeeState.successMess}</Alert> </Collapse> }
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
                                        Informacion del empleado
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                            required
                                            name="firstName"
                                            label="Nombre"
                                            id="firstName"
                                            className={classes.textField}
                                            type="text"
                                            value={employee.firstName}
                                            onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                            required
                                            name="lastName"
                                            label="Apellido"
                                            id="lastName"
                                            className={classes.textField}
                                            type="text"
                                            value={employee.lastName}
                                            onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                            required
                                            name="email"                                   
                                            id="email"
                                            value={employee.email}
                                            onChange={handleChange}
                                            label="Email"
                                            className={classes.textField}
                                            type="email"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                            required
                                            label="Cedula"
                                            name="document"                                   
                                            id="document"
                                            value={employee.document}
                                            onChange={handleChange}
                                            className={classes.textField}
                                            type="text"
                                            />
                                        </Grid>     
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                            required
                                            label="Edad"
                                            name="age"                                   
                                            id="age"
                                            value={employee.age}
                                            onChange={handleChange}
                                            className={classes.textField}
                                            type="number"
                                            />
                                        </Grid>    
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                            required
                                            label="EPS"
                                            name="eps"                                   
                                            id="eps"
                                            value={employee.eps}
                                            onChange={handleChange}
                                            className={classes.textField}
                                            type="text"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                            required
                                            label="Salario"
                                            name="salary"                                   
                                            id="salary"
                                            value={employee.salary}
                                            onChange={handleChange}
                                            className={classes.textField}
                                            type="number"
                                            />
                                        </Grid>  
                                        <Grid item xs={12}>
                                            <FormControl variant="filled" className={classes.formControl} fullWidth>
                                                <InputLabel id="demo-simple-select-outlined-label" >Rol</InputLabel>
                                                <Select
                                                labelId="rol"
                                                id="rol"
                                                fullWidth
                                                required
                                                value={employee.rol}
                                                onChange={handleChange}
                                                label="Rol"
                                                name="rol"
                                                >
                                                <MenuItem value="profesor">PROFESOR</MenuItem>
                                                <MenuItem value="gerente">GERENTE</MenuItem>
                                                <MenuItem value="director">DIRECTOR</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>                                                               
                                        <Grid item xs={12}>
                                            {updateEmployeeState.isLoading === true ?<Button variant="contained" color="primary"justify="space-between">
                                                <CircularProgress color="secondary"/> 
                                            </Button> :                                    
                                            <Button variant="contained" color="primary" type="submit" justify="space-between">
                                                Actualizar empleado
                                            </Button>}
                                        </Grid>
                                    </Grid>
                                </form>
                            </React.Fragment>
                        </Paper>
                    </Modal>
                </Grid>
            </Paper>

        </div>
    )
}

const mapStatetoProps = (state) =>{
    return{
        getAllEmployeeState:state.getAllEmployee,
        deleteEmployeeState:state.deleteEmployee,
        searchEmployeeState:state.searchEmployee,
        updateEmployeeState:state.updateEmployee
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return {
        getAllEmployee:()=>{
            dispatch(GetAllEmployee())
        },
        deleteEmployee:(idEmployee,history) => {
            dispatch(DeleteEmployeeAction(idEmployee,history)) 
        }, 
        searchEmployee:(idPet) => {
          dispatch(SearchEmployeeByID(idPet)) 
        },  
        updateEmployee:(employeeUpdate,history) => {
          dispatch(UpdateEmployeeAction(employeeUpdate,history)) 
        },     
    }
  }

export default connect(mapStatetoProps,mapDispatchToProps)(EmployeeManagement)
