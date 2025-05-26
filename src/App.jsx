import React, { useState, useEffect } from 'react';
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';


const ImportantLable = () => {
  return (
    <span className="bg-red-400 text-white px-3 py-1 rounded-full mr-5">Important</span>
    // <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">In Progress</span>
  )
}

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white shadow-md p-3 text-center text-gray-600 mt-8">
      © {new Date().getFullYear()} Listecal App. All rights reserved.
    </footer>
  );
};



const TodoApp = () => {

  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const [isLableImportant, setIsLableImportant] = useState(false);

  const [taskCheck, setTaskCheck] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [showFinished, setShowFinished] = useState(true);
  const [fadingId, setFadingId] = useState("")


  useEffect(() => {
    // darkMode
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
    // todos
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos && storedTodos.length > 0) {
      setTodos(JSON.parse(storedTodos));
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

  }, [darkMode])

  // ✅ Handle Hamburger Menu



  // ✅ Handle Dark Mode Toggle
  const handleToggle = () => {
    setDarkMode(!darkMode);
    console.log("Dark mode:", darkMode);
  }

  const toggleCheckAndShowFinished = () => {
    setShowFinished(!showFinished);
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  // ✅ Add Todo   or what Save Button do
  const handleAdd = () => {
    if (todo.trim() === "") return;

    const newTodo = {
      todo,
      isImportant: isLableImportant,
      isCompleted: false,
      id: uuidv4(),
    };

    setTodos([newTodo, ...todos]);
    setTodo("");
    setIsLableImportant(false);
  };

  const handleImportant = () => {
    setIsLableImportant(!isLableImportant);
  }

  const handleComplete = (e) => {
    const isChecked = e.target.checked;
    const id = e.target.id;

    setTaskCheck(!taskCheck);

    setTodos(
      todos.map((todo) =>
        todo.id == id ? { ...todo, isCompleted: isChecked } : todo
      )
    );
  };

  // ✅ Edit Todo
  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);

    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setIsLableImportant(todoToEdit.isImportant);
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  // ✅ Delete Todo
  const handleDelete = (id) => {
    setFadingId(`${id}`); // mark which item is fading
    setTimeout(() => {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    }, 500); // match animation duration
  };



  return (
    <div className={`min-h-screen flex flex-col justify-between bg-gray-100 ${darkMode ? 'invert' : ''}`}>

      <Navbar handleToggle={handleToggle} darkMode={darkMode} />

      <main className="flex-grow flex justify-center mb-12 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
          <h1 className="flex justify-center text-center m-2 mb-7 font-semibold text-2xl p3">Listecal - Manage your to-do's at once place</h1>
          <h2 className="text-xl font-semibold text-gray-800 m-0.5 mt-6">Add a Todo</h2>
          <div className="flex items-center justify-between mt-4">
            <input
              type="text"
              placeholder="Add a task / todo"
              className="w-full p-3 border rounded-xl bg-gray-100 text-gray-600 outline-none"
              value={todo}
              onChange={handleChange}
            />

            {/* <FaPlus size={40} className="text-2xl p-2 rounded-full bg-gray-800 text-white cursor-pointer" /> */}
            <button className="  bg-blue-600 text-white py-3 px-5 font-semibold ml-2 rounded-full flex items-center justify-center" onClick={handleAdd} >Save</button>
          </div>
          <div className="flex items-center mt-4">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" checked={isLableImportant} className="sr-only peer" onChange={handleImportant} />
              <div className="w-5 h-5 rounded-full border border-red-500 flex items-center justify-center peer-checked:bg-red-500 transition">
                <svg
                  className="w-3 h-3 text-white hidden peer-checked:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="ml-2 text-sm text-red-600 font-medium">Mark as Important</span>
            </label>
          </div>


          <h2 className="text-xl font-semibold text-gray-800 mt-6">Your Todos</h2>

          <label className="items-center inline cursor-pointer">
          <input type="checkbox" className='w-4 h-4 ml-1 m-2.5' onChange={toggleCheckAndShowFinished} checked={showFinished} />Show Finished Todos
          </label>

          <ul className="mt-4 space-y-4">

            {todos.length === 0 && (
              <li className={`mt-10 flex flex-col items-center justify-center bg-gray-100 p-6 rounded-2xl shadow-md animate-fade-in `}>
                <span className="text-4xl mb-3">📋</span>
                <p className="text-gray-600 text-lg font-semibold">
                  No tasks available.
                </p>
                <p className="text-gray-500 text-sm">
                  Add a task to get started!
                </p>
              </li>
            )}

            {todos.map((todo) => {
              return ((showFinished || !todo.isCompleted) &&
                <li key={todo.id} className={`flex justify-between items-center todo-item p-3 bg-gray-50 rounded-xl shadow-sm ${fadingId == todo.id ? 'fade-out' : ''}`}>
                  <div className="flex max-w-7/10 whitespace-pre-wrap items-center gap-2">
                    <input type="checkbox" id={todo.id} checked={todo.isCompleted} onChange={(e) => handleComplete(e)} className="w-5 h-5 shrink-0" />
                    <span className={`text-gray-800 transition-all ${todo.isCompleted ? "line-through" : "no-underline"}`}>{todo.todo}</span>
                  </div>
                  <span className="flex gap-2.5">
                    {todo.isImportant && <ImportantLable />}
                    <RiEdit2Line onClick={() => handleEdit(todo.id)} id={todo.id} className="text-gray-700 cursor-pointer" size={25} />
                    <MdDeleteOutline onClick={() => handleDelete(todo.id)} id={todo.id} className="text-gray-700 cursor-pointer" size={25} />
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TodoApp;
