import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "../../features/todo/todoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoSlice);

  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;
    setInputValue("");
    dispatch(
      addTodo({
        id: todoList.todos.length,
        text: inputValue,
      })
    );
  };

  const handleUpdateTask = (id) => {
    dispatch(updateTodo({ id, text: updatedTodo }));
    setEditIndex(null);
    setUpdatedTodo("");
  };

  const handleDeleteTask = (id) => {
    dispatch(removeTodo({ id }));
  };

  const handleEditIndex = (id, text) => {
    setEditIndex(id);
    setUpdatedTodo(text);
  };
  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <input
          type="text"
          className="border border-gray-300 p-2 w-full mb-4"
          placeholder="Add a todo..."
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
          {todoList.todos.map((todo, index) => (
            <li key={index} className="border-b border-gray-300 py-2">
              {editIndex === todo.id ? (
                <>
                  <input
                    type="text"
                    className="border border-gray-300 p-1 mr-2"
                    value={updatedTodo}
                    onChange={(e) => setUpdatedTodo(e.target.value)}
                  />
                  <button
                    className="text-green-500 hover:text-green-600"
                    onClick={() => handleUpdateTask(todo.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{todo.text}</span>
                  <button
                    className="text-blue-500 hover:text-blue-600 ml-2"
                    onClick={() => handleEditIndex(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600 ml-2"
                    onClick={() => handleDeleteTask(todo.id)}
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
