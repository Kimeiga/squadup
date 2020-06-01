import firebase from "firebase/app";
import { isNil } from "lodash";

let asyncFirestore = null;

// Lazy load firestore with async import is important for performance

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: "AIzaSyCpJ16nEK-_WlD5Et9SDGb-FJcxufxJ_bU",
  authDomain: "squad-up-21a9e.firebaseapp.com",
  databaseURL: "https://squad-up-21a9e.firebaseio.com",
  projectId: "squad-up-21a9e",
  storageBucket: "squad-up-21a9e.appspot.com",
  messagingSenderId: "350232073633",
  appId: "1:350232073633:web:af4e44f43c14e789bb67e0",
  measurementId: "G-K5W5NRHPTR"
};

firebase.initializeApp(config);

export default () => {
  if (isNil(asyncFirestore)) {
    asyncFirestore = import(/* webpackChunkName: "chunk-firestore" */ "firebase/firestore").then(
      () => {
        firebase.firestore().settings({});
        firebase.firestore().enablePersistence({ synchronizeTabs: true });
        return firebase.firestore();
      }
    );
  }
  return asyncFirestore;
};
