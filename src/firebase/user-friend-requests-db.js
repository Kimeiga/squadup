import GenericDB from "./generic-db";

export default class UserFriendsDB extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/friend-requests`);
  }

  // Here you can extend UserFriendsDB with custom methods
}
