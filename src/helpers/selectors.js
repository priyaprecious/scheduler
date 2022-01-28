export function getAppointmentsForDay(state, day) {
// find the specific day
    const selectedDay = state.days.filter(oneDay => oneDay.name === day);

// if no data in the array then return empty
    if (selectedDay.length === 0) {
        return selectedDay;
    }

// return appointment if interview is on the particular day
    const listOfAppointments = selectedDay[0].appointments.map(id => {
        for (const appointment in state.appointments) {
            if (id === state.appointments[appointment].id) {
                return state.appointments[appointment];
            }
        }
        return null;
    });

    return listOfAppointments;
};

export function getInterview(state, interview) {
    const selectedInterview = {};

    if (!interview) {
        return null;
    }

// add student and interviewer if the interviewer matches 
    Object.keys(state.interviewers).forEach(key => {
        if (state.interviewers[key].id === interview.interviewer) {
            selectedInterview.student = interview.student;
            selectedInterview.interviewer = state.interviewers[key];
        }
    });

    return selectedInterview;
};

export function getInterviewersForDay(state, day) {
// find the specific day
    const selectedDay = state.days.filter(oneDay => oneDay.name === day);

// if no data then return empty array
    if (selectedDay.length < 1) {
        return selectedDay;
    }

// return interviewer if the id matches in the selected day
    const listOfInterviewers = selectedDay[0].interviewers.map(id => {
        for (const interviewer in state.interviewers) {
            if (id === state.interviewers[interviewer].id) {
                return state.interviewers[interviewer];
            }
        }
        return null;
    });

    return listOfInterviewers;
};