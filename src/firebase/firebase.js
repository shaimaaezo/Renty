import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBx6kbBzVCuwn0ZYk23gp0-ogIFFAN1P9c",
    authDomain: "final-5bde0.firebaseapp.com",
    projectId: "final-5bde0",
    storageBucket: "final-5bde0.appspot.com",
    messagingSenderId: "918403766215",
    appId: "1:918403766215:web:80ad1d5bc5abe201ee6be2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();