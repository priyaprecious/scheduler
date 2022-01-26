export function getAppointmentsForDay(state, day) {
    
    const selectedDay = state.days.filter(oneDay => oneDay.name === day);
    
    
    if (selectedDay.length === 0) {
      return selectedDay;
    }
  
    
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
  
    
    Object.keys(state.interviewers).forEach(key => {
      if (state.interviewers[key].id === interview.interviewer) {
        selectedInterview.student = interview.student;
        selectedInterview.interviewer = state.interviewers[key];
      }
    });
  
    return selectedInterview;
  };
  

  export function getInterviewersForDay(state, day) {
    
    const selectedDay = state.days.filter(oneDay => oneDay.name === day);
    
    
    if (selectedDay.length < 1) {
      return selectedDay;
    }
  
    
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