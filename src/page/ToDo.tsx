import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodoList,
  addTodo,
  updateTodo,
  sortTodo,
  toggleCompleted,
} from "../component/taskManagerSlice";
import { TiPencil } from "react-icons/ti";
import { BsCheckLg, BsTrash } from "react-icons/bs";
import { Heading } from "../component/Heading";
import { RootState } from "../store/store";
import { Spinner } from "../component/Spinner";

interface TodoItem {
  task: string;
  id: string;
  completed: boolean;
}

function TodoList() {
  const dispatch = useDispatch();
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const sortCriteria = useSelector(
    (state: RootState) => state.todo.sortCriteria
  );
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoItem | null>(null);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLoading(true);
    const localTodoList = JSON.parse(localStorage.getItem("todoList") || "[]");
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
    setLoading(false);
  }, [dispatch]);

  const handleAddTodo = (task: string) => {
    if (task.trim().length === 0) {
      setError("Please enter a task");
    } else {
      dispatch(addTodo({ task: task, id: Date.now().toString() }));
      setNewTask("");
      setError("");
    }
  };

  const handleUpdateToDoList = (id: string, task: string) => {
    if (task.trim().length === 0) {
      setError("Please enter a task");
    } else {
      dispatch(updateTodo({ task: task, id: id }));
      setShowModal(false);
      setError("");
    }
  };

  const handleDeleteToDo = (id: string) => {
    const updatedToDoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
  };

  function handleSort(sortCriteria: string) {
    dispatch(sortTodo(sortCriteria));
  }

  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Done" && todo.completed) return true;
    if (sortCriteria === "Todo" && !todo.completed) return true;
    return false;
  });

  const handleToggleCompleted = (id: string) => {
    dispatch(toggleCompleted({ id }));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Heading />
          <div>
            {showModal && (
              <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
                <div className="bg-white p-5 rounded-md relative">
                  <button
                    className="absolute top-2 right-2 m-1"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <input
                    className="border p-2 rounded-md outline-none mt-5 mb-8 mx-5"
                    value={newTask}
                    onChange={(e) => {
                      setNewTask(e.target.value);
                      setError("");
                    }}
                    placeholder={
                      currentTodo ? "Update your Todo here" : "Add a new Todo"
                    }
                  />
                  {error && (
                    <p className="text-red-500 text-center mb-3">{error}</p>
                  )}
                  {currentTodo ? (
                    <div className="flex justify-center">
                      <button
                        onClick={() => {
                          handleUpdateToDoList(currentTodo.id, newTask);
                        }}
                        className={`bg-[#FF8144] text-white py-3 px-10 rounded-md  hover:bg-lightorange ${
                          newTask.trim().length === 0 ? "opacity-50" : ""
                        }`}
                        disabled={newTask.trim().length === 0}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        className={`bg-orange text-white py-3 px-10 rounded-md ${
                          newTask.trim().length === 0 ? "opacity-50" : ""
                        }`}
                        disabled={newTask.trim().length === 0}
                        onClick={() => {
                          handleAddTodo(newTask);
                          setShowModal(false);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className=" flex items-center justify-center flex-col mx-9 ">
              {todoList.length === 0 ? (
                <div className="mb-6 mt-12">
                  <p className="text-center text-Gray">
                    Empty todo list? Not for long! Let's add your first task.
                  </p>
                </div>
              ) : (
                <div className="container mx-auto mt-6 cursor-pointer">
                  <div className="flex justify-center mb-6 cursor-pointer">
                    <select
                      onChange={(e) => handleSort(e.target.value)}
                      className="p-1 outline-none text-sm rounded-md shadow-custom cursor-pointer"
                    >
                      <option value="All" className="text-sm">
                        All
                      </option>
                      <option value="Done" className="text-sm">
                        Done
                      </option>
                      <option value="Todo" className="text-sm">
                        Not done
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center justify-center flex-col c">
                    {sortToDoList.map((todo) => (
                      <div
                        key={todo.id}
                        className="mx-9 bg-white border-1 shadow-custom flex items-center justify-between mb-6 w-full md:w-[75%] rounded-md p-4"
                        onClick={() => {
                          handleToggleCompleted(todo.id);
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <button
                            className={`flex items-center justify-center h-8 w-8 rounded-full border-2 flex-shrink-0 ${
                              todo.completed
                                ? " bg-lightorange"
                                : "border-lightpink"
                            }`}
                          >
                            {todo.completed && (
                              <BsCheckLg className="text-white" />
                            )}
                          </button>

                          <div
                            className={`${
                              todo.completed
                                ? "opacity-50 line-through decoration-1"
                                : "text-black"
                            }`}
                          >
                            {todo.task}
                          </div>
                        </div>

                        <div>
                          <button
                            className=" text-[#1EB341] p-1 rounded-md ml-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowModal(true);
                              setCurrentTodo(todo);
                              setNewTask(todo.task);
                            }}
                          >
                            <TiPencil />
                          </button>
                          <button
                            className="text-[#FF4038] p-1 rounded-md ml-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteToDo(todo.id);
                            }}
                          >
                            <BsTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <button
                className="bg-[#FF8144] text-center text-white py-3 px-10 rounded-md shadow-customButton hover:bg-[#FFB691] "
                onClick={() => {
                  setShowModal(true);
                  setCurrentTodo(null);
                  setNewTask("");
                }}
              >
                Add Todo
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TodoList;
