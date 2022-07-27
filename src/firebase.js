import firebase from "./firebase";


const firebaseConfig = {
    apiKey: "AIzaSyCQBem1t56GPAYj9x-goKepuqUU13g3icI",
    authDomain: "whatsapp-d9b9f.firebaseapp.com",
    projectId: "whatsapp-d9b9f",
    storageBucket: "whatsapp-d9b9f.appspot.com",
    messagingSenderId: "874608777302",
    appId: "1:874608777302:web:e6c755d4e590e55f4c43f7",
    measurementId: "G-SZKK9MWWJ3"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export {auth,provider};
  export default db;