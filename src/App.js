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
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2 flex`,
  form: `flex justify-between`,
  input: `border p-2 m-2 w-full text-xl`,
  button: `border p-4 m-2 bg-green-400`,
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

    //clert input text
    setInput('');
  };
  //Read todo from firebase

  useEffect(() => {
    //set page title
    document.title = 'nTodo ບັນທຶກໜ້າວຽກ';

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
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>
          ແອັບບັນທຶກໜ້າວຽກ ໂດຍ ໜຸ່ຍ
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.facebook.com/pnuii7'
            className=' text-blue-700 underline font-semibold ml-2'
          >
            facebook
          </a>
        </h3>

        <form onSubmit={CreateTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className={style.input}
            type='text'
            placeholder='ປ້ອນລາຍລະອຽດວຽກ'
            // placeholder='Add todo'
          />
          <button className={style.button}>
            <AiOutlinePlus size={20} />
          </button>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p
            className={style.count}
          >{`ໜ້າວຽກທີ່ຕ້ອງເຮັດມີ: ${todos.length} ຢ່າງ`}</p>
        )}
        <p className=' text-sm text-center p-2'>
          ສະຫງວນລິຂະສິດ fishb0ne © 2023{' '}
        </p>
      </div>
    </div>
  );
}

export default App;
