import React, { useState, useEffect } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 m-2 w-full text-xl`,
  button: `border p-4 m-2 bg-purple-500`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //Create todo
  const CreateTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a valid todo!');
      return;
    }

    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
  };
  //Read todo from firebase

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      let todosArr = [];
      querySnapShot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };
  //Delete todo in firebase

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={CreateTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className={style.input}
            type='text'
            placeholder='Add todo'
          />
          <button className={style.button}>
            <AiOutlinePlus size={20} />
          </button>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} />
          ))}
        </ul>
        <p className={style.count}>You have 2 todos</p>
      </div>
    </div>
  );
}

export default App;
