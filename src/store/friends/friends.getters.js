import { find } from "lodash";

export default {
  /**
   * Check if a friend has deletion pending
   */
  isFriendDeletionPending: state => friendId =>
    state.friendDeletionPending.includes(friendId),

  /**
   * Get friend by id
   */
  getFriendById: state => friendId =>
    find(state.friends, friend => friend.id === friendId)
};
