/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import SquadsDB from "@/firebase/squads-db";

export default {
  /**
   * Fetch all squads
   */
  getSquads: async ({ commit }) => {
    const squadsDB = new SquadsDB();
    const squads = await squadsDB.readAll();

    commit("setSquads", squads);
  },

  clearCurrentSquad: async ({ commit }) => {
    commit("setSquad", null);
  },

  getCurrentSquad: async ({ commit }, squadID) => {
    const squadsDB = new SquadsDB();
    commit("setSquad", await squadsDB.read(squadID));
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

  newSquad: async ({commit, state}) => {
    if (state.squadUserToCreate === "") return;
    if (state.squadGameToCreate === "") return;

    const squadDB = new SquadsDB();

    const newSquad = {
      game: state.squadGameToCreate,
      users: [state.squadUserToCreate],
      time: null
    };

    commit("setSquadCreationPending", true);
    const createdSquad = await squadDB.create(newSquad);
    commit("addSquad", createdSquad);
    commit("setSquadCreationPending", false);
    commit("setSquadUserToCreate", "");
    commit("setSquadGameToCreate", "");
    commit("setSquadCreating", false);
  },

  clearSquadCreating: async ({commit}) => {
    commit("setSquadUserToCreate", "");
    commit("setSquadGameToCreate", "");
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
    squad.users.push(rootState.authentication.user.displayName);
    await squadDB.update(squad);
    commit("setSquad", squad);
  },

  join: async ({ state, commit }, squadID) => {
    const squadDB = new SquadsDB();

    const squad = await squadDB.read(squadID);
    squad.users.push(state.squadUserToCreate);
    await squadDB.update(squad);
    commit("setSquadUserToCreate", "");
    commit("setSquad", squad);
  },

  leaveSquad: async ({ rootState, commit }, squadID) => {
    const squadDB = new SquadsDB();

    const squad = await squadDB.read(squadID);
    const idx = squad.users.indexOf(rootState.authentication.user.displayName);
    squad.users.splice(idx, 1);
    await squadDB.update(squad);
    commit("setSquad", squad);
  }
};
