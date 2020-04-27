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

  /**
   * Create a product for current loggedin user
   */
  createSquad: async ({ commit }, squad) => {
    const squadDB = new SquadsDB();

    commit("setSquadCreationPending", true);
    const createdSquad = await squadDB.create(squad);
    commit("addSquad", createdSquad);
    commit("setSquadCreationPending", false);
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
  }
};
