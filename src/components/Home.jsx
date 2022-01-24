import React,{useState}  from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Divider from '@material-ui/core/Divider';
import {Typography,TextField,Avatar} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';


import SearchIcon from '@material-ui/icons/Search';

import { connect } from 'react-redux'
import {SearchPetByID} from '../redux/actions/PetAction';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(10, 5, 8),
  },
  cardHeader: {
    backgroundColor:"#000",
    color:'#ffff'
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  imgLogo:{
    width:'100%',
},
  cardContent:{
    backgroundColor:'#BFD9DC'
    
  },
  welcome:{
    color:"#000",
    borderColor:"#000",
    fontWeightMedium: 500,
    fontWeight: "bold",
  },
  containerSearch:{
    marginTop:"2%",
    backgroundImage:`url(${"assets/canva-photo-editor_1.png"})`,
    padding:'3%',
    paddingTop:'1%'
  },
  avatar: {
    margin: theme.spacing(1),
    width:"25%",
    height:"25%"
  },
  searchTitle:{
    fontWeight: "bold",
  },
  imgCard:{
    borderRadius:'100%',
    width:'70%',
    marginTop:'2%'
  },
  cardContainer:{
    marginTop:'5%',
  },
  card:{
    borderRadius:'10%',
  },
  cadInfo:{
    paddingLeft:'2%'
  },
  imgGrid:{
    backgroundImage:`url(${"assets/canva-photo-editor_3.png"})`,
    color:"#fff"
  },
  infoGrid:{
    backgroundImage:`url(${"assets/canva-photo-editor_4.png"})`,
  },
  status:{
    color:"#000",
    fontWeightMedium: 500,
    fontWeight: "bold",
  },
  title:{
    margin:"1%",
    fontWeightMedium: 500,
    fontWeight: "bold",
  },
  novelty:{
    marginTop:"5%",
    marginLeft:"4%",
    overflow:"hidden",
    color:"#fff"
  },
  noveltyTitle:{
    color:"#000"
  }
}));

const tiers = [
  {
    title: 'Guarderia',
    description: ['Cuidamos de tu mascota para que no las dejes solas en casa proporcionamos un cuidado especial a todas las mascotas.'],
    src:'assets/spaimgss2.png',
  },
  {
    title: 'SPA',
    subheader: 'Más popular',
    description: [
        "Realizamos masajes con musicoterapia y aromaterapia, para que pasen un momento relajante y agradable."
    ],
    src:'assets/spaimgss.png',
  },
  {
    title: 'Escuela',
    description: [
      "Reforzamos los comandos que tu perro ya sabe y les enseñamos algunos nuevos de una obediencia básica."
    ],
    src:'assets/spaimgss1.png',
  },
];


function Home(props) {
  const classes = useStyles();
  const {searchPetState,searchPet} = props;
  const [petId, setPetId] = useState("")

  const searchPetId = () =>{
      searchPet(petId)
  }
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setPetId(value)
}
  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="lg" component="main" className={classes.heroContent}>
      
        <Grid align="center">
          <Avatar className={classes.avatar} >
            <img src="assets/perfectLogo.png" alt="" className={classes.imgLogo}/>
          </Avatar>  
        </Grid> 
        <Typography variant="h2" align="center" className={classes.welcome} component="p">
            Guardería Canina Medellín- La Mina
        </Typography>
        <Typography variant="h4" align="center">
        ¿Estás buscando una guardería canina? Pues lo estas haciendo bien. Tenemos servicio de guardería, Spa y escuela.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center',color:'#fff' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent className={classes.cardContent}>
                
                  <div className={classes.cardPricing}>
                    <img src={tier.src} alt={tier.title} />
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Grid container  alignItems="center" justify="center" className={classes.containerSearch}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h2' align="center" className={classes.welcome} component="p">Consulta por tu mascota</Typography>
            <br />
            <Divider />
            <Typography  variant='h6' align="center" component="p">¿Estas preocupado por el estado de tu mascota? Ingresa aquí el código que recibiste en tu correo electrónico al momento del registro y así conocer su estado.</Typography>
            <br />
            <br />
          </Grid>
         
          <Grid item xs={12} sm={7}>
              <TextField
                  required
                  placeholder="Buscar..."
                  id="search"
                  name="search"
                  type="text"
                  fullWidth
                  onChange={handleChange}
              />
          </Grid>
          <Grid item xs={12} sm={1}>
              <Button variant="contained" color="dark" type="button" onClick={searchPetId} >
                  <SearchIcon fontSize="small"/>
              </Button>
          </Grid> 
          
        {searchPetState.pet.length !==0 && 
        <Grid item xs={12} sm={5} className={classes.cardContainer}  alignItems="center" justify="center" >
          <Card className={classes.card}>
            <Grid container xs={12} sm={12} spacing={0} direction="row"> 
              <Grid item xs={4} sm={4} align="center" className={classes.imgGrid}>
                <CardMedia
                  component="img"     
                  image="assets/esteperrito.png"
                  alt="Live from space album cover"
                  className={classes.imgCard}
                />
                <CardContent>
                  <Typography component="p" variant="h6">
                    Nombre: {searchPetState.pet.name}
                  </Typography>
                  <Typography variant="h6"component="p">
                    Raza: {searchPetState.pet.breed}
                  </Typography>
                  <Typography variant="h6" component="p">
                    Edad: {searchPetState.pet.age}
                  </Typography>
                </CardContent>
              </Grid>
              <Grid item xs={8} sm={8}  className={classes.infoGrid}>
                    <Typography component="p" variant="h4" align="center" className={classes.status}>
                    Novedades
                    </Typography>
                    <Divider />
                    <Typography component="p"  align="left" className={classes.novelty}>  
                      {searchPetState.pet.noveltySpa && <Typography component="p" variant="h5" align="left" className={classes.noveltyTitle}> Notificacion de baño</Typography>}
                      {searchPetState.pet.noveltySpa}
                      <br />
                      {searchPetState.pet.noveltyEducation && <Typography component="p" variant="h5" align="left" className={classes.noveltyTitle}>  Notificacion de educación</Typography>}
                      {searchPetState.pet.noveltyEducation}
                      <br />
                      {searchPetState.pet.noveltyNursery && <Typography component="p" variant="h5" align="left" className={classes.noveltyTitle}> Notificacion de guarderia</Typography>}
                      {searchPetState.pet.noveltyNursery}
                    </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>}
        </Grid>    
    </React.Fragment>
  );
}

const mapStatetoProps = (state) =>{
  return{
      searchPetState:state.searchPet,
  }
}


const mapDispatchToProps = (dispatch) =>{
  return {
      searchPet:(idPet) => {
        dispatch(SearchPetByID(idPet)) 
      },  
  }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Home);