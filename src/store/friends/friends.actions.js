import UserFriendsDB from "@/firebase/user-friends-db";
import {
  getUsernameFromUserID,
  getUserPhotoUrlFromUserID
} from "@/misc/helpers";

export default {
  /**
   * Fetch friends of current loggedin user
   */
  getUserFriends: async ({ rootState, commit }) => {
    const userFriendDb = new UserFriendsDB(rootState.authentication.user.id);

    const friends = await userFriendDb.readAll();
    commit("setFriends", friends);
  },

  /**
   * Create friend
   */
  createUserFriend: async ({ commit, rootState }, friend) => {
    const userFriendDb = new UserFriendsDB(rootState.authentication.user.id);
    const friendFriendDb = new UserFriendsDB(friend);

    const name = await getUsernameFromUserID(friend);
    const photo = await getUserPhotoUrlFromUserID(friend);
    console.log("friend");
    debugger;
    console.log({
      friendId: friend,
      friendName: name,
      friendPhoto: photo
    });
    const createdFriend = await userFriendDb.create({
      friendId: friend,
      friendName: name,
      friendPhoto: photo
    });
    console.log(createdFriend);
    await friendFriendDb
      .create({
        friendId: rootState.authentication.user.id,
        friendName: rootState.authentication.user.displayName,
        friendPhoto: rootState.authentication.user.photoURL
      })
      .then()
      .catch(e => console.error(e));
    commit("addFriend", createdFriend);
  },

  /**
   * Delete a user friend from its id
   */
  deleteUserFriend: async ({ rootState, commit, getters }, friendId) => {
    if (getters.isFriendDeletionPending(friendId)) return;
    const friend = getters.getFriendById(friendId);

    const userFriendsDb = new UserFriendsDB(rootState.authentication.user.id);
    const friendFriendsDb = new UserFriendsDB(friend.friendId);
    const userFriendId = (await friendFriendsDb.readAll([
      ["friendId", "==", rootState.authentication.user.id]
    ]))[0].id;

    commit("addFriendDeletionPending", friendId);
    await userFriendsDb.delete(friendId);
    await friendFriendsDb.delete(userFriendId);
    commit("removeFriendById", friendId);
    commit("removeFriendDeletionPending", friendId);
  }
};
