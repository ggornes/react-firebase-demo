import * as firebase from "firebase";
import firestore from "firebase/firestore";

// no longer required
//const settings = { timestampsInSnapshots: true};

const config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
};

firebase.initializeApp(config);

//  firebase.firestore().settings(settings);

export default firebase;