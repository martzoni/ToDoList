// frontend/src/components/TodoList.tsx
import React, { useState, useEffect } from "react";
import {
  getTodos,
  updateTodo,
  deleteTodo,
  Todo,
} from "../services/todoService";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Charger les tâches
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTodos();
      setTodos(data);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Une erreur est survenue lors du chargement des tâches.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Charger les tâches au chargement du composant et lors de mises à jour
  useEffect(() => {
    loadTodos();

    // Ajouter un écouteur d'événement pour recharger les tâches après une mise à jour
    const handleTodoUpdated = () => {
      loadTodos();
    };

    window.addEventListener("todo-updated", handleTodoUpdated);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("todo-updated", handleTodoUpdated);
    };
  }, []);

  // Basculer l'état "complété" d'une tâche
  const handleToggleComplete = async (todo: Todo) => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
      loadTodos();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la tâche:", error);
    }
  };

  // Supprimer une tâche
  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        await deleteTodo(id);
        loadTodos();
      } catch (error) {
        console.error("Erreur lors de la suppression de la tâche:", error);
      }
    }
  };

  // Filtrer les tâches par catégorie
  const filteredTodos = selectedCategory
    ? todos.filter((todo) => todo.category === selectedCategory)
    : todos;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="todo-list">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-5 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
        >
          Filtrer par catégorie
        </button>
        {isOpen && (
          <div className="absolute z-10 w-48 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-700 dark:divide-gray-600">
            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200">
              {["Toutes", "Personnel", "Travail", "Courses", "Autre"].map(
                (category) => (
                  <li key={category}>
                    <div className="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id={`filter-radio-${category}`}
                        type="radio"
                        name="filter-radio"
                        value={category}
                        checked={
                          selectedCategory === category ||
                          (category === "Toutes" && !selectedCategory)
                        }
                        onChange={() => {
                          setSelectedCategory(
                            category === "Toutes" ? null : category
                          );
                          setIsOpen(false);
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor={`filter-radio-${category}`}
                        className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                      >
                        {category}
                      </label>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Chargement des tâches...</div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-list">
          {selectedCategory
            ? `Aucune tâche dans la catégorie "${selectedCategory}".`
            : "Aucune tâche à afficher."}
        </div>
      ) : (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 ">
                    Tâche
                  </th>
                  <th scope="col" className="px-6 py-3 w-full">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Catégorie
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTodos.map((todo) => (
                  <tr
                    key={todo._id}
                    className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                      todo.completed ? "opacity-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {todo.title}
                    </td>
                    <td className="px-6 py-4 max-w-[100px] ">
                        <div className="line-clamp-2 break-words">{todo.description || "Aucune description"}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-white  bg-blue-600/25 rounded dark:bg-blue-500/25">
                        {todo.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        className={`p-2 text-white rounded ${
                          todo.completed
                            ? "bg-gray-500"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                        onClick={() => handleToggleComplete(todo)}
                        title={
                          todo.completed ? "Terminé" : "Marquer comme terminé"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                      <button
                        className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
                        onClick={() => handleDelete(todo._id)}
                        title="Supprimer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoList;
