import "./App.css";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "./lib/firebase";
import Todo from "./components/Todo";

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
      <div>
        {!user && (
          <>
            <p>Firestore Authentication</p>
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
          <Todo />
          <p>Logged in as: {user.email}</p>
          <button onClick={logOut}>Log Out</button>
        </div>
      )}
    </>
  );
}

export default App;
