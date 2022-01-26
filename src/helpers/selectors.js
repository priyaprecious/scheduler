export function getAppointmentsForDay(state, day) {
    // filter from list of days to find the specific day
    const selectedDay = state.days.filter(oneDay => oneDay.name === day);
    
    // if filtered array contains no data, return the empty array
    if (selectedDay.length === 0) {
      return selectedDay;
    }
  
    // map through each appointment for the day, return the appointment object where its id is equal to the appointment id in the day object
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
  