import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  //Fetch todos from FireStore

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapShot = await getDocs(collection(db, "todos"));
      setTodos(
        querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    fetchTodos();
  }, []); // Only RUNS ONCE

  // Add a new todo
  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    const docRef = await addDoc(collection(db, "todos"), {
      text: newTodo,
      completed: false,
    });
    setTodos([...todos, { text: newTodo, completed: false, id: docRef.id }]);
    setNewTodo("");
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div>
        <h1>Todo</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        ></input>
        <button onClick={addTodo}>Add TODO</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );

  return <h1>Todo</h1>;
};

export default Todo;
