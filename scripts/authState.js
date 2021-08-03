import { sign } from "crypto";
import firebase from "firebase";
(function(){
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCY_zPYxxmIy1oUTCTsuRpcPVyjxH0gtA",
    authDomain: "squart-cda0b.firebaseapp.com",
    databaseURL: "https://squart-cda0b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "squart-cda0b",
    storageBucket: "squart-cda0b.appspot.com",
    messagingSenderId: "887806015048",
    appId: "1:887806015048:web:623c438b3d909d59338a7d",
    measurementId: "G-PSQC2NP20S"
  };
  firebase.intializeApp(config);
// Get Elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const txtLogin = document.getElementById('txtLogin');
  const txtSignUp = document.getElementById('txtSignUp');
  const txtLogout = document.getElementById('txtLogout');

  // Adding login events 
  btnLogin.addEventListener('click', e =>{
      //Get email and password
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();

      //Sign in
      const promise = auth.SingInWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
  }
  )
})