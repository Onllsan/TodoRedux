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
import { BsTrash } from "react-icons/bs";
import { Heading } from "../component/Heading";
import { RootState } from "../store/store";

// Définir le type pour un élément de la liste de tâches
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

  // Effectuer un effet de bord lorsque la liste des tâches change
  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  // Charger la liste de tâches du localStorage au chargement du composant
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem("todoList") || "[]");
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, [dispatch]);

  // Ajouter une nouvelle tâche à la liste de tâches
  const handleAddTodo = (task: string) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(addTodo({ task: task, id: Date.now().toString() }));
      setNewTask("");
      setShowModal(true);
    }
  };

  // Mettre à jour une tâche existante dans la liste de tâches
  const handleUpdateToDoList = (id: string, task: string) => {
    if (task.trim().length === 0) {
      alert("Please enter a task");
    } else {
      dispatch(updateTodo({ task: task, id: id }));
      setShowModal(false);
    }
  };

  // Supprimer une tâche de la liste de tâches
  const handleDeleteToDo = (id: string) => {
    const updatedToDoList = todoList.filter((todo) => todo.id != id);
    dispatch(setTodoList(updatedToDoList));
    localStorage.setItem("todoList", JSON.stringify(updatedToDoList));
  };

  // Trier la liste de tâches
  function handleSort(sortCriteria: string) {
    dispatch(sortTodo(sortCriteria));
  }

  // Obtenir la liste de tâches triée
  const sortToDoList = todoList.filter((todo) => {
    if (sortCriteria === "All") return true;
    if (sortCriteria === "Completed" && todo.completed) return true;
    if (sortCriteria === "Not Completed" && !todo.completed) return true;
    return false;
  });

  // Basculer l'état de complétion d'une tâche
  const handleToggleCompleted = (id: string) => {
    dispatch(toggleCompleted({ id }));
  };

  // Rendu du composant
  return (
    <>
      <Heading />
      <div>
        {showModal && (
          <div className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center">
            <div className="bg-white p-4 rounded-md">
              <input
                className="border p-2 rounded-md outline-none mb-8"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder={
                  currentTodo ? "Update your task here" : "Enter your task here"
                }
              />
              <div className="flex justify-between">
                {currentTodo ? (
                  <>
                    <button
                      onClick={() => {
                        setShowModal(false);
                        handleUpdateToDoList(currentTodo.id, newTask);
                      }}
                      className="bg-sunsetOrange text-white py-3 px-10 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      className="bg-Tangaroa rounded-md text-white py-3 px-10"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-Tangaroa rounded-md text-white py-3 px-10"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-sunsetOrange text-white py-3 px-10 rounded-md"
                      onClick={() => {
                        handleAddTodo(newTask);
                        setShowModal(false);
                      }}
                    >
                      Add
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <div className=" flex items-center justify-center flex-col">
          {todoList.length === 0 ? (
            <div className="mb-6">
              <div className="sm:w-[500px] sm:h-[500px] min-w-[250px] min-[250px]">
                {/* <img src={todo} alt="" /> */}
              </div>
              <p className="text-center text-Gray">
                You have no todo's, please add one.
              </p>
            </div>
          ) : (
            <div className="container mx-auto mt-6">
              <div className="flex justify-center mb-6">
                <select
                  onChange={(e) => handleSort(e.target.value)}
                  className="p-1 outline-none text-sm"
                >
                  <option value="All" className="text-sm">
                    All
                  </option>
                  <option value="Completed" className="text-sm">
                    Completed
                  </option>
                  <option value="Not Completed" className="text-sm">
                    Not Completed
                  </option>
                </select>
              </div>
              <div>
                {sortToDoList.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-md p-4"
                  >
                    <div
                      className={`${
                        todo.completed
                          ? "line-through text-greenTeal"
                          : "text-sunsetOrange"
                      }`}
                      onClick={() => {
                        handleToggleCompleted(todo.id);
                      }}
                    >
                      {todo.task}
                    </div>
                    <div>
                      <button
                        className="bg-blue-500 text-white p-1 rounded-md ml-2"
                        onClick={() => {
                          setShowModal(true);
                          setCurrentTodo(todo);
                          setNewTask(todo.task);
                        }}
                      >
                        <TiPencil />
                      </button>
                      <button
                        className="bg-sunsetOrange text-white p-1 rounded-md ml-2"
                        onClick={() => handleDeleteToDo(todo.id)}
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
            className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add Task
          </button>
        </div>
      </div>
    </>
  );
}

export default TodoList;
