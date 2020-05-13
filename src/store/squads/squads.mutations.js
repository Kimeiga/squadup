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

  /* Squad creation */
  setSquadCreationPending: (state, value) =>
    (state.squadCreationPending = value),
  setSquadUserToCreate: (state, userNameToCreate) => 
    (state.squadUserToCreate = userNameToCreate),
  setSquadGameToCreate: (state, gameToCreate) => 
    (state.squadGameToCreate = gameToCreate),
  setSquadCreating: (state, val) => (state.creatingSquad = val)
};
