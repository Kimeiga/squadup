import { getUserIDFromUsername } from "@/misc/helpers";

import UserRequestsDB from "@/firebase/user-friend-requests-db";

export default {
  /**
   * Fetch requests of current loggedin user
   */
  getUserRequests: async ({ rootState, commit }) => {
    const userRequestDb = new UserRequestsDB(rootState.authentication.user.id);

    const requests = await userRequestDb.readAll();
    commit("setRequests", requests);
  },

  /**
   * Create a request for current loggedin user
   */
  triggerAddRequestAction: async ({ state, dispatch, commit }) => {
    if (state.requestNameToCreate === "") return;
    const uid = await getUserIDFromUsername(state.requestNameToCreate);
    commit("setRequestNameToCreate", "");
    dispatch("sendUserRequest", uid);
  },

  /**
   * Create a request for current loggedin user
   */
  sendUserRequest: async ({ rootState }, uid) => {
    const friendRequestDb = new UserRequestsDB(uid);
    const userRequestDb = new UserRequestsDB(rootState.authentication.user.id);

    if (
      (await friendRequestDb.readAll([
        ["senderId", "==", rootState.authentication.user.id]
      ])).length > 0 ||
      (await userRequestDb.readAll([["senderId", "==", uid]])).length > 0
    )
      return;

    const req = {
      senderId: rootState.authentication.user.id,
      senderName: rootState.authentication.user.displayName,
      senderPhoto: rootState.authentication.user.photoURL
    };
    await friendRequestDb.create(req);
  },

  /**
   * Delete a request from its id
   */
  deleteUserRequest: async ({ rootState, commit, getters }, requestId) => {
    if (getters.isRequestDeletionPending(requestId)) return;

    const userRequestsDb = new UserRequestsDB(rootState.authentication.user.id);

    commit("addRequestDeletionPending", requestId);
    await userRequestsDb.delete(requestId);
    commit("removeRequestById", requestId);
    commit("removeRequestDeletionPending", requestId);
  },

  /**
   * Accept a request from its id
   */
  acceptUserRequest: async (
    { commit, dispatch, getters, rootState },
    requestId
  ) => {
    if (getters.isRequestDeletionPending(requestId)) return;

    const userRequestsDb = new UserRequestsDB(rootState.authentication.user.id);
    commit("addRequestDeletionPending", requestId);
    await userRequestsDb.delete(requestId);
    const req = getters.getRequestById(requestId);
    dispatch("/friends/createUserFriend", req.senderId);
    commit("removeRequestById", requestId);
    commit("removeRequestDeletionPending", requestId);
  }
};
