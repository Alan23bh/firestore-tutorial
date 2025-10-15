import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
const auth = getAuth(app);

function App() {
  //const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Checks the user's authentication state when the app loads
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    return () => unsubscribe();
  });

  // useEffect(() => {
  //   async function testFirestore() {
  //     const docRef = doc(db, "testCollection", "testDocument");
  //     const docSnap = await getDoc(docRef);

  //     // Updates specific fields

  //     await updateDoc(docRef, {
  //       age: "9002",
  //       name: "Marry McBarry",
  //     });

  //     if (docSnap.exists()) {
  //       setName(docSnap.data().name);
  //     } else {
  //       console.log("No such document");
  //     }
  //   }
  //   testFirestore();
  // }, []);

  // Sign Up
  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log("User signed up:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  // Sign In
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log("User has signed in :", userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing in", error);
      });
  };

  // Sign Out
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out", error);
      });
  };

  return (
    <>
      <p>Firestore Authentication</p>
      <div className="container">
        {!user && (
          <>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button onClick={signUp}>Sign Up</button>
            <button onClick={signIn}>Sign In</button>
          </>
        )}
      </div>
      {user && (
        <div>
          <p>Logged in as: {user.email}</p>
          <button onClick={logOut}>Log Out</button>
        </div>
      )}
    </>
  );
}

export default App;
