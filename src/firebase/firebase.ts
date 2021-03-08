import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import config from "./config";

export default class Firebase {
  private static firebaseInstance: Firebase;
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;

  private constructor() {
    const app = firebase.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  static getTimestamp = ():firebase.firestore.FieldValue => {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  static getInstance(): Firebase {
    if (!this.firebaseInstance) {
      this.firebaseInstance = new Firebase();
    }
    return this.firebaseInstance;
  }
}
