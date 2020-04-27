import router from "@/router";
import { isNil } from "lodash";
import { createNewUserFromFirebaseAuthUser } from "@/misc/helpers";
import UsersDB from "@/firebase/users-db";

export default {
  /**
   * Callback fired when user login
   */
  login: async ({ commit, dispatch }, firebaseAuthUser) => {
    const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid);

    const user = isNil(userFromFirebase)
      ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
      : userFromFirebase;

    commit("setUser", user);
    dispatch("products/getUserProducts", null, { root: true });
    dispatch("requests/getUserRequests", null, { root: true });
    dispatch("friends/getUserFriends", null, { root: true });
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit }) => {
    commit("setUser", null);
    commit("products/setProducts", null, { root: true });
    commit("requests/setRequests", null, { root: true });
    commit("friends/setFriends", null, { root: true });

    const currentRouter = router.app.$route;
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push("/login");
    }
  }
};
