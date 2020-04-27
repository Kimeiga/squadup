import GenericDB from "./generic-db";

export default class UserFriendsDB extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/friends`);
  }

  // Here you can extend UserFriendsDB with custom methods
}
