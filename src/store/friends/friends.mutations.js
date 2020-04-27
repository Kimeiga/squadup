export default {
  /* Friend input name */
  setFriendNameToCreate: (state, friendNameToCreate) =>
    (state.friendNameToCreate = friendNameToCreate),

  /* Friends */
  setFriends: (state, friends) => (state.friends = friends),
  addFriend: (state, friend) => state.friends.push(friend),
  removeFriendById: (state, friendId) => {
    const index = state.friends.findIndex(friend => friend.id === friendId);
    state.friends.splice(index, 1);
  },

  /* Friends deletion */
  addFriendDeletionPending: (state, friendId) =>
    state.friendDeletionPending.push(friendId),
  removeFriendDeletionPending: (state, friendId) => {
    const index = state.friends.findIndex(friend => friend.id === friendId);
    state.friendDeletionPending.splice(index, 1);
  },

  /* Friend creation */
  setFriendCreationPending: (state, value) =>
    (state.friendCreationPending = value)
};
