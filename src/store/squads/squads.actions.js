/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import SquadsDB from "@/firebase/squads-db";
import UsersDB from "@/firebase/users-db";

export default {
  /**
   * Fetch all squads
   */
  getSquads: async ({ commit }) => {
    const squadsDB = new SquadsDB();
    const squads = await squadsDB.readAll();

    commit("setSquads", squads);

    // eslint-disable-next-line no-unused-vars
    for (const squad of squads) {
      const creator = await new UsersDB().read(squad.creator);

      commit("setSquadToCreator", { squad, creator });
    }
  },

  /**
   * Create a product for current loggedin user
   */
  createSquad: async ({ rootState, commit }, product) => {
    const squadDB = new SquadsDB();

    const newSquad = {
      creator: rootState.authentication.user.id,
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
