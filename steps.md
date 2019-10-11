## Steps
1) create new react app
2) change ...

3) create a database in firebase (test mode)
4) Create a collection: click on start collection
name of collection: words
add the fields: author, description, title

5) install firebase module yarn add firebase --save

6) create Firebase.js inside src folder
```js
import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true};

const config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DB_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGIN_ID",

};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
```

7)  on settings > add firebase to your web app (on the </> logo)
it gives the config

8)  yarn add react-router-dom bootstrap --save

9) create components folder with: Create.js, Edit.js, Show.js