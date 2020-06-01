const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.cleanSquads = functions.pubsub.schedule('0 * * * *').onRun((context) => {
  const time = new Date().getTime();
  admin.firestore().collection('squads').get().then((snapshot) => {
    snapshot.forEach(async e => {
      if(time - e.data().time > 7200000) await admin.firestore.collection('squads').doc(e.id()).delete();
    });
  });
});
