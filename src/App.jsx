import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [name, setName] = useState();

  useEffect(() => {
    async function testFirestore() {
      const docRef = doc(db, "testCollection", "testDocument");
      const docSnap = await getDoc(docRef);

      // Updates specific fields

      await updateDoc(docRef, {
        age: "9002",
        name: "Marry McBarry",
      });

      if (docSnap.exists()) {
        setName(docSnap.data().name);
      } else {
        console.log("No such document");
      }
    }
    testFirestore();
  }, []);

  return (
    <>
      <p>Firestore Check {name}</p>
    </>
  );
}

export default App;
