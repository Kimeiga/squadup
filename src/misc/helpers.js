import UsersDB from "@/firebase/users-db";

/**
 * Create new user from firebase auth user infos
 */
// eslint-disable-next-line
export const createNewUserFromFirebaseAuthUser = async firebaseAuthUser => {
  const providerData = firebaseAuthUser.providerData[0];
  const { displayName, photoURL, email } = providerData;
  const userDb = new UsersDB();
  const user = {
    displayName,
    photoURL,
    email
  };

  return userDb.create(user, firebaseAuthUser.uid);
};

/**
 * Get uid from username
 */
export const getUserIDFromUsername = async name => {
  const userDb = new UsersDB();
  return (await userDb.readAll([["displayName", "==", name]]))[0].id;
}


/**
 * Get username from uid
 */
export const getUsernameFromUserID = async uid => {
  const userDb = new UsersDB();
  return (await userDb.read(uid)).displayName;
}

/**
 * Get user photo url from uid
 */
export const getUserPhotoUrlFromUserID = async uid => {
  const userDb = new UsersDB();
  return (await userDb.read(uid)).photoURL;
}
