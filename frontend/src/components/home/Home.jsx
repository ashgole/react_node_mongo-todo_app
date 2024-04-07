import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../features/todo/todoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoSlice);

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;
    const updatedTasks = [...tasks, { id: Date.now(), text: inputValue }];
    setTasks(updatedTasks);
    setInputValue("");
    // dispatch(
    //   addTodo({
    //     id: todoList.todos.length + 1,
    //     text: inputValue,
    //   })
    // );
    // console.log("ok todoList", todoList);
  };

  const handleUpdateTask = (id, text) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );

    setTasks(updatedTasks);
    setEditIndex(null);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full mb-4"
          placeholder="Add a task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          onClick={handleAddTask}
        >
          Add Task
        </button>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="border-b border-gray-300 py-2">
              {editIndex === task.id ? (
                <>
                  <input
                    type="text"
                    className="border border-gray-300 p-1 mr-2"
                    value={task.text}
                    onChange={(e) => handleUpdateTask(task.id, e.target.value)}
                  />
                  <button
                    className="text-green-500 hover:text-green-600"
                    onClick={() => handleUpdateTask(task.id, task.text)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{task.text}</span>
                  <button
                    className="text-blue-500 hover:text-blue-600 ml-2"
                    onClick={() => setEditIndex(task.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 ml-2"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
