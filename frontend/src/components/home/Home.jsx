import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo } from "../../features/todo/todoSlice";
import { ADD_TODO, DELETE_TODO, GET_TODOS } from "../../utils/constants";
import { postData } from "../../utils/api";
import { isSignin } from "../../utils/token";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoSlice);

  const [inputValue, setInputValue] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (!isSignin("refreshToken")) {
      navigate("/signin");
      return;
    }

    const getTodoList = async () => {
      try {
        let reponse = await postData(GET_TODOS, "");
        reponse.data.count &&
          reponse.data.todoList.map((item) => {
            dispatch(
              addTodo({
                id: item.id,
                text: item.text,
              })
            );
          });
      } catch (error) {
        console.error("Error fetching todo list:", error);
      }
    };
    getTodoList();
  }, []);

  const handleAddTask = async () => {
    if (inputValue.trim() === "") return;
    setInputValue("");
    try {
      let todoPayload = {
        id: todoList.todos.length,
        text: inputValue,
      };
      let reponse = await postData(ADD_TODO, todoPayload);
      if (reponse.statusCode === 200) {
        dispatch(
          addTodo({
            id: reponse.data.id,
            text: reponse.data.text,
          })
        );
      }
    } catch (error) {
      console.error("Error while adding todo :", error);
    }
  };

  const handleUpdateTask = async (id) => {
    setEditIndex(null);
    setUpdatedTodo("");

    try {
      let todoPayload = {
        id: id,
        text: updatedTodo,
      };
      let reponse = await postData(ADD_TODO, todoPayload);
      if (reponse.statusCode === 200) {
        dispatch(
          updateTodo({
            id: reponse.data.id,
            text: reponse.data.text,
          })
        );
      }
    } catch (error) {
      console.error("Error while adding todo :", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      let todoPayload = {
        id,
      };
      let reponse = await postData(DELETE_TODO, todoPayload);
      if (reponse.statusCode === 200) {
        dispatch(removeTodo({ id }));
      }
    } catch (error) {
      console.error("Error while adding todo :", error);
    }
  };

  const handleEditIndex = (id, text) => {
    setEditIndex(id);
    setUpdatedTodo(text);
  };

  return (
    <>
      <div className="h-screen max-w-md mx-auto mt-8">
        <div className="h-1/4 ">
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
        </div>
        <div className="h-3/4 overflow-auto">
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
      </div>
    </>
  );
};

export default Home;
