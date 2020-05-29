export default {
  /* Squad input game name */
  setSquadGameNameToCreate: (state, squadGameNameToCreate) =>
    (state.squadGameNameToCreate = squadGameNameToCreate),

  /* Squads */
  setSquads: (state, squads) => (state.squads = squads),
  addSquad: (state, squad) => state.squads.push(squad),
  removeSquadById: (state, squadID) => {
    const index = state.squads.findIndex(squad => squad.id === squadID);
    state.squads.splice(index, 1);
  },
  setSquad: (state, squad) => (state.currentSquad = squad),

  /* Squads deletion */
  addSquadsDeletionPending: (state, squadID) =>
    state.squadDeletionPending.push(squadID),
  removeSquadDeletionPending: (state, squadID) => {
    const index = state.squads.findIndex(squad => squad.id === squadID);
    state.squadDeletionPending.splice(index, 1);
  },
  setTimes: (state, times) => (state.times = times),

  /* Squad creation */
  setSquadCreationPending: (state, value) =>
    (state.squadCreationPending = value),
  setSquadUserToCreate: (state, userNameToCreate) => 
    (state.squadUserToCreate = userNameToCreate),
  setSquadTimeToCreate: (state, userTimeToCreate) => 
    (state.squadTimeToCreate = userTimeToCreate),
  setSquadDayToCreate: (state, userDayToCreate) => 
    (state.squadDayToCreate = userDayToCreate),
  setSquadMessageToCreate: (state, userMessageToCreate) =>
    (state.squadMessageToCreate = userMessageToCreate),
  updateDay: (state, day) => {
    state.squadDayToCreate = day;
    const d = new Date(parseInt(day, 10));
    const now = new Date();
    if(now.getMonth() === d.getMonth() && now.getDate() === d.getDate()) {
      state.times = Array.apply(0, Array(23 - now.getHours())).map((_,b) => {
        let readable = `${b + 1 + now.getHours()}:00 AM`;
        if(now.getHours() + 1 + b === 0)  readable = '12:00 AM';
        else if(now.getHours() + 1 + b === 12) readable = '12:00 PM';
        else if(now.getHours() + 1 + b > 12) readable = `${(b + 1 + now.getHours()) - 12}:00 PM`
        return {
          'readable': readable, 
          'timestamp': ((b + 1 + now.getHours())*3600000).toString()
        }
      });
    } else {
      state.times = Array.apply(0, Array(24)).map((_,b) => {
        let readable = `${b}:00 AM`;
        if(b === 0) readable = '12:00 AM';
        else if(b === 12) readable = '12:00 PM';
        else if(b > 12) readable = `${b - 12}:00 PM`;
        return {
          'readable': readable, 
          'timestamp':(b*3600000).toString()
        }
      });
    }
  },
  setDays: (state) => {
    let day = new Date();
    if(day.getHours() === 23) day = new Date(day.getTime() + 86400000);
    day.setHours(0);
    state.days = Array.apply(0, Array(7)).map((_,b) => {
        const d = new Date(day.getTime() + b * 86400000);
        return {'readable':`${d.getMonth() + 1}/${d.getDate()}`, 'timestamp':d.getTime().toString()};
    });
  },
  setSquadGameToCreate: (state, gameToCreate) => 
    (state.squadGameToCreate = gameToCreate),
  setSquadCreating: (state, val) => (state.creatingSquad = val)
};
