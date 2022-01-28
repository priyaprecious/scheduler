import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
// all states into one object
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    })

// update day state
    const setDay = day => setState({ ...state, day });

// get data from database and set state with the data received
    useEffect(() => {
        Promise.all([
            axios.get('/api/days'),
            axios.get('/api/appointments'),
            axios.get('/api/interviewers')
        ]).then((all) => {
            setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
        }).catch(error => console.log(`Error: ${error.message}`));
    }, []);


    function bookInterview(id, interview) {

// update appointment based on the id
        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };

// add new appointment to the existing list of appointments
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };


        const dayBooked = state.days.filter(day => day.name === state.day)
        const dayIndex = state.days.findIndex(day => day.name === state.day)

// contains new interview
        const updateSpot = {
            ...dayBooked[0],
            spots: (state.appointments[id].interview ? dayBooked[0].spots : dayBooked[0].spots - 1)
        }

// update the previous state of the particular day
        const days = [
            ...state.days.slice(0, dayIndex),
            updateSpot,
            ...state.days.slice(dayIndex + 1)
        ]


        return axios.put(`/api/appointments/${id}`, { interview })
            .then(() => {
                setState(prev => ({ ...prev, appointments, days }));
            });
    }

// to cancel the interview
    function cancelInterview(id) {


        const cancelledAppointment = {
            ...state.appointments[id],
            interview: null
        };

// append the cancelled appointment to the list of appointments
        const appointments = {
            ...state.appointments,
            [id]: cancelledAppointment
        };


        const dayBooked = state.days.filter(day => day.name === state.day)
        const dayIndex = state.days.findIndex(day => day.name === state.day)

// particular day where the interview got cancelled
        const updateSpot = {
            ...dayBooked[0],
            spots: (dayBooked[0].spots + 1)
        }

// update the previous state of the particular day
        const days = [
            ...state.days.slice(0, dayIndex),
            updateSpot,
            ...state.days.slice(dayIndex + 1)
        ]


        return axios.delete(`/api/appointments/${id}`)
            .then(() => {
                setState(prev => ({ ...prev, appointments, days }));
            });
    }


    return { state, setDay, bookInterview, cancelInterview };
}