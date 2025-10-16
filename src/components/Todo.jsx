import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

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

  // Start editing a todo
  const startEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  // Save the edited Todo

  const saveEdit = async (id) => {
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      text: editText,
    });

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );

    setEditId(null); // Exiting the edit mode
    setEditText(""); // Clearing the edit text
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
            {editId.Id === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(event) => setEditText(event.target.value)}
                ></input>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => startEdit(todo.id, todo.text)}>
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );

  return <h1>Todo</h1>;
};

export default Todo;
