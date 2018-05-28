import Rebase from 're-base';
// paquete especifico de react para firebase
// permite replicar el estado de la app a firebase

import firebase from 'firebase';
// paquete oficial de firebase

// configurar aplicacion
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyATYU6JEifgqgRhp0Daf7kmfuXHdTf1X4Y",
  authDomain: "catch-of-the-day-ach.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-ach.firebaseio.com",
});

// crear la base
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;