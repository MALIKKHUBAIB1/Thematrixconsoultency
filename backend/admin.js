const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  // <- check added
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://postdata-d0e7b-default-rtdb.firebaseio.com",
  });
}

module.exports = admin;
