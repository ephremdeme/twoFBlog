import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/remote-config"
import "firebase/database"
import config from "./config";

export default class Firebase {
  static firebase() {
      throw new Error("Method not implemented.");
  }
  private static firebaseInstance: Firebase;
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  analytics: firebase.analytics.Analytics;
  remote: firebase.remoteConfig.RemoteConfig;
  database: firebase.database.Database;
  private constructor() {
    const app = firebase.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    this.analytics = app.analytics();
    this.remote = app.remoteConfig();
    this.database = app.database();
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

const provider = new firebase.auth.GoogleAuthProvider();

export {provider, firebase as fbase}