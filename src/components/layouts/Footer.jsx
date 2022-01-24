import React from 'react'
import { makeStyles,Container,Grid,Box} from '@material-ui/core'
import {Link} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import WhatsAppIcon from '@material-ui/icons//WhatsApp';

const useStyles = makeStyles((theme) => ({
    link:{
        textDecoration:'none',
        color:"#fff"
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingBottom: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(0),
        },
        backgroundColor:"#000",
        color:"#fff"
    },

    wpp:{
      fontSiza:'100px',
      color:'#4FC95B',
    }
}));

function Copyright() {
    return (
      <Typography variant="body2" color="common.white" align="center">
        {'Copyright © '}
        <Link color="inherit" to="/home">
         Inicio
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  };

const footers = [
    {
      title: <WhatsAppIcon fontSize="large" />,
      description: [ 'Telefono: +57 3507839359','Dirección: Crr30 # 34 06', 'Contacto: Manuel.calle@udea.edu.co', 'CC: el carme center local 304'],
    },
  ];

const Footer = () => {
    const classes = useStyles();
    return (
        //Footer 
            <React.Fragment >
                <CssBaseline />
                <Container maxWidth={false} component="footer" className={classes.footer}>
                <Grid container spacing={1} justifyContent="center">
                    {footers.map((footer) => (
                    <Grid item xs={6} sm={6} key={footer.title} align="center">
                        <Typography variant="h6" gutterBottom className={classes.wpp}>
                        {footer.title}
                        </Typography>
                        <ul>
                        {footer.description.map((item) => (
                            <Typography variant="subtitle1"  className={classes.link} key={item}>
                                {item}
                            </Typography>
                        ))}
                        </ul>
                    </Grid>
                    ))}
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
                </Container>
            </React.Fragment>
        // End footer
    );
}

export default Footer
