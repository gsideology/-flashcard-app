// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDawsQ8L3qq9hwilp4NmDU-VmWf4tdKMqA",
  authDomain: "lexilearn-cbfe8.firebaseapp.com",
  projectId: "lexilearn-cbfe8",
  storageBucket: "lexilearn-cbfe8.firebasestorage.app",
  messagingSenderId: "479052338664",
  appId: "1:479052338664:web:f1020fd841f6a29967805d",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    console.warn("Persistence failed");
  } else if (err.code === "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    console.warn("Persistence is not available");
  }
});

export { db, auth };
