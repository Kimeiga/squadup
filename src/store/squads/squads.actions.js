/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
import SquadsDB from "@/firebase/squads-db";

export default {
  /**
   * Fetch all squads
   */

  setupDateSelection: async ({ commit }) => {
    commit("setDays");
    commit("setTimes", []);
  },

  setSquadGame: async ({ commit, rootState }, name) => {
    commit("setSquadGameToCreate", name);
    if(rootState.authentication.user) {
      commit("setSquadUserToCreate", "");
      if((name === 'Valorant' || name === 'League of Legends') && rootState.authentication.user.riotId) commit("setSquadUserToCreate", rootState.authentication.user.riotId);
      if(name === 'Fortnite' && rootState.authentication.user.epicId) commit("setSquadUserToCreate", rootState.authentication.user.epicId);
      if(name === 'DOTA 2' && rootState.authentication.user.dotaId) commit("setSquadUserToCreate", rootState.authentication.user.dotaId);
      if(name === 'Counter-Strike' && rootState.authentication.user.steamId) commit("setSquadUserToCreate", rootState.authentication.user.steamId);
      if(name === 'Minecraft' && rootState.authentication.user.mojangId) commit("setSquadUserToCreate", rootState.authentication.user.mojangId);
    }
  },

  getSquads: async ({ commit }) => {
    const squadsDB = new SquadsDB();
    let squads = await squadsDB.readAll();
    const time = new Date().getTime();
    const newSquad = []

    for(let i = 0; i < squads.length; i+=1) {
        if(time - squads[i].time > 7200000) await squadsDB.delete(squads[i].id);
        else newSquad.push(squads[i]);
    }

    squads = newSquad;

    commit("setSquads", squads.map((x) => {
      if(x.time != null) {
        const t = new Date(parseInt(x.time, 10));
        const today = new Date();
        const tmrw = new Date(today.getTime() + 86400000)
        x.day = t.toDateString().substring(0, t.toDateString().lastIndexOf(' '));
        if(t.getDate() === today.getDate()) x.day = "Today";
        if(t.getDate() === tmrw.getDate()) x.day = "Tomorrow";
        x.hour = `${t.getHours()}:00 AM`;
        if(t.getHours() === 0) x.hour = '12:00 AM';
        else if(t.getHours() === 12) x.hour = '12:00 PM';
        else if(t.getHours() > 12) x.hour = `${t.getHours() - 12}:00 PM`;
      }
      return x;
    }));
  },

  clearCurrentSquad: async ({ commit }) => {
    commit("setSquad", null);
  },

  getCurrentSquad: async ({ commit, dispatch }, squadID) => {
    const squadsDB = new SquadsDB();
    const s = await squadsDB.read(squadID);
    const t = new Date(parseInt(s.time, 10));
    const today = new Date();
    const tmrw = new Date(today.getTime() + 86400000)
    s.day = t.toDateString().substring(0, t.toDateString().lastIndexOf(' '));
    if(t.getDate() === today.getDate()) s.day = "Today";
    if(t.getDate() === tmrw.getDate()) s.day = "Tomorrow";
    s.hour = `${t.getHours()}:00 AM`;
    if(t.getHours() === 0) s.hour = '12:00 AM';
    else if(t.getHours() === 12) s.hour = '12:00 PM';
    else if(t.getHours() > 12) s.hour = `${t.getHours() - 12}:00 PM`;
    console.log(s);
    dispatch("setSquadGame", s.game);
    commit("setSquad", s);
  },

  /**
   * Create a product for current loggedin user
   */
  createSquad: async ({ rootState, commit }, product) => {
    const squadDB = new SquadsDB();

    const newSquad = {
      game: product.name,
      users: [rootState.authentication.user.displayName]
    };

    console.log("newSquad");
    console.log(newSquad);

    commit("setSquadCreationPending", true);
    const createdSquad = await squadDB.create(newSquad);
    console.log("createdSquad");
    console.log(createdSquad);
    commit("addSquad", createdSquad);
    commit("setSquadCreationPending", false);
    return createdSquad.id;
  },

  newSquad: async ({commit, rootState, state}) => {
    if (state.squadUserToCreate === "" && !rootState.authentication.user) return;
    if (state.squadGameToCreate === "") return;
    if (state.squadTimeToCreate === "") return;

    const squadDB = new SquadsDB();
    const squadTime = new Date(parseInt(state.squadDayToCreate, 10) + parseInt(state.squadTimeToCreate, 10));
    let newSquad = {};
    if(rootState.authentication.user) {
      newSquad = {
        game: state.squadGameToCreate,
        users: [{name: rootState.authentication.user.displayName, photo: rootState.authentication.user.photoURL, userid: state.squadUserToCreate, id: rootState.authentication.user.id}],
        time: squadTime.getTime(),
        message: state.squadMessageToCreate
      };
    } else {
      newSquad = {
        game: state.squadGameToCreate,
        users: [state.squadUserToCreate],
        time: squadTime.getTime(),
        message: state.squadMessageToCreate
      };
    }
    commit("setSquadCreationPending", true);
    const createdSquad = await squadDB.create(newSquad);
    const today = new Date();
    const tmrw = new Date(today.getTime() + 86400000)
    createdSquad.day = squadTime.toDateString().substring(0, squadTime.toDateString().lastIndexOf(' '));
    if(squadTime.getDate() === today.getDate()) createdSquad.day = "Today";
    if(squadTime.getDate() === tmrw.getDate()) createdSquad.day = "Tomorrow";
    createdSquad.hour = `${squadTime.getHours()}:00 AM`;
    if(squadTime.getHours() === 0) createdSquad.hour = '12:00 AM';
    else if(squadTime.getHours() === 12) createdSquad.hour = '12:00 PM';
    else if(squadTime.getHours() > 12) createdSquad.hour = `${squadTime.getHours() - 12}:00 PM`;
    commit("addSquad", createdSquad);
    commit("setSquadCreationPending", false);
    commit("setSquadUserToCreate", "");
    commit("setSquadGameToCreate", "");
    commit("setSquadTimeToCreate", "");
    commit("setSquadMessageToCreate", "");
    commit("setSquadDayToCreate", "");
    commit("setSquadCreating", false);
  },

  clearSquadCreating: async ({commit}) => {
    commit("setSquadUserToCreate", "");
    commit("setSquadGameToCreate", "");
    commit("setSquadTimeToCreate", "");
    commit("setSquadDayToCreate", "");
    commit("setSquadMessageToCreate", "");
    commit("setSquadCreating", false);
  },

  // /**
  //  * Create a new product for current loggedin user and reset product name input
  //  */
  // triggerAddProductAction: ({ dispatch, state, commit }) => {
  //   if (state.productNameToCreate === "") return;

  //   const product = { name: state.productNameToCreate };
  //   commit("setProductNameToCreate", "");
  //   dispatch("createUserProduct", product);
  // },

  /**
   * Delete a user product from its id
   */
  deleteSquad: async ({ commit, getters }, squadID) => {
    if (getters.isSquadDeletionPending(squadID)) return;

    const squadDB = new SquadsDB();

    commit("addSquadDeletionPending", squadID);
    await squadDB.delete(squadID);
    commit("removeSquadById", squadID);
    commit("removeSquadDeletionPending", squadID);
  },

  joinSquad: async ({ rootState, commit }, squadID) => {
    const squadDB = new SquadsDB();

    const squad = await squadDB.read(squadID);
    squad.users.push({name: rootState.authentication.user.displayName, photo: rootState.authentication.user.photoURL, userid: ""});
    await squadDB.update(squad);
    commit("setSquad", squad);
  },

  join: async ({ rootState, state, commit }, squadID) => {
    const squadDB = new SquadsDB();

    const squad = await squadDB.read(squadID);
    if(rootState.authentication.user) {
      squad.users.push({name: rootState.authentication.user.displayName,
        photo: rootState.authentication.user.photoURL,
        userid: state.squadUserToCreate,
        id: rootState.authentication.user.id
      });
    } else {
      squad.users.push(state.squadUserToCreate);
    }
    await squadDB.update(squad);
    if(!rootState.authentication.user) commit("setSquadUserToCreate", "");
    commit("setSquad", squad);
  },

  leaveSquad: async ({ rootState, commit }, squadID) => {
    const squadDB = new SquadsDB();

    const squad = await squadDB.read(squadID);
    let i = 0;
    for(i = 0; i < squad.users.length; i += 1) {
        if(squad.users[i].id && squad.users[i].id === rootState.authentication.user.id) break;
    }
    squad.users.splice(i, 1);
    await squadDB.update(squad);
    commit("setSquad", squad);
  }
};
