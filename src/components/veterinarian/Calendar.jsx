import React,{useState,useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress} from '@material-ui/core';

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

import { connect } from 'react-redux'
import { GetAllAppointment } from '../../redux/actions/SchedulerAction';


const useStyles = makeStyles((theme) => ({
    calendar:{
        margin:"2%"
    }
}));

const Calendar = (props) => {
    const classes = useStyles();
    const {getAllAppointmentState,getAllAppointment} = props;
    const [currentDate,setCurrentDate] = useState(new Date());
    const [resources] = useState([{fieldName: 'location',title: 'Location',instances: [{ id: 'Room 1', text: 'Guarderia central' }]},{fieldName: 'members',title: 'Members',instances: [{ id: 'Manuel Calle Garces', text: 'Manuel Calle Garces' },{id: 'Angie Castañeda', text: 'Angie Castañeda'},{id: 'Alejandro Muñoz', text: 'Alejandro Muñoz'},{id: 'Chope', text: 'Chope'}]}]);

    useEffect(() => {
        getAllAppointment();
    
    }, [getAllAppointment]);
    
    const currentDateChange = (currentDate) => { setCurrentDate( currentDate ); };
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

    return (
        <Grid container spacing={0} direction="row" justifyContent="flex-start" alignItems="flex-start" >
            <Grid item xs={12} sm={12} className={classes.calendar}> 
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
                    />
                    <Resources
                        data={resources}
                    />
                    </Scheduler>
                </Paper>}
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) =>{
    return{
        getAllAppointmentState:state.getAllAppointment,
    }
  }
  
  const mapDispatchToProps = (dispatch) =>{
    return {
        getAllAppointment:() => {
            dispatch(GetAllAppointment()) 
        }
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
