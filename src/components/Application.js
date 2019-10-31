import React, { useState, useEffect } from "react";
import axios from "axios"
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import {getAppointmentsForDay, getInterview} from "helpers/selectors"



export default function Application(props) {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

useEffect(() => {
  let daysURL = "http://localhost:8001/api/days"
  let appointmentsURL = "http://localhost:8001/api/appointments"
  let interviewersURL = "http://localhost:8001/api/interviewers"
  
  const promise1 = axios.get(daysURL);
  const promise2 = axios.get(appointmentsURL);
  const promise3 = axios.get(interviewersURL);
  
  Promise.all([promise1, promise2, promise3])
  .then((all) => {
    setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  });
},[])


const appointments = getAppointmentsForDay(state, state.day);
const schedule = appointments.map((appointment) => {
  let interview = null
  if (appointment.interview) {
    interview = {
      student: appointment.interview.student,
      interviewer: state.interviewers[`${appointment.interview.interviewer}`]
    }
  }
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
  );
});



  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList days={state.days} day={state.day} setDay={(string) => setState({...state, day:string})} />
  </nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
     {schedule}
      </section>
    </main>
  );
}
