// frontend/src/components/TodoList.tsx
import React, { useState, useEffect } from 'react';
import { getTodos, updateTodo, deleteTodo, Todo } from '../services/todoService';

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
      const message = error.response?.data?.message || 'Une erreur est survenue lors du chargement des tâches.';
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

    window.addEventListener('todo-updated', handleTodoUpdated);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('todo-updated', handleTodoUpdated);
    };
  }, []);

  // Basculer l'état "complété" d'une tâche
  const handleToggleComplete = async (todo: Todo) => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
      loadTodos();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  };

  // Supprimer une tâche
  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await deleteTodo(id);
        loadTodos();
      } catch (error) {
        console.error('Erreur lors de la suppression de la tâche:', error);
      }
    }
  };

  // Filtrer les tâches par catégorie
  const filteredTodos = selectedCategory
    ? todos.filter(todo => todo.category === selectedCategory)
    : todos;

  return (
    <div className="todo-list">
      <div className="todo-list-header">
        <h2>Mes tâches</h2>

        <div className="category-filter">
          <label htmlFor="category-filter">Filtrer par catégorie:</label>
          <select
            id="category-filter"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">Toutes</option>
            <option value="Personnel">Personnel</option>
            <option value="Travail">Travail</option>
            <option value="Courses">Courses</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Chargement des tâches...</div>
      ) : filteredTodos.length === 0 ? (
        <div className="empty-list">
          {selectedCategory
            ? `Aucune tâche dans la catégorie "${selectedCategory}".`
            : 'Aucune tâche à afficher.'}
        </div>
      ) : (
        <ul className="todos">
          {filteredTodos.map(todo => (
            <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <h3 className="todo-title">{todo.title}</h3>
                {todo.description && <p className="todo-description">{todo.description}</p>}
                <div className="todo-meta">
                  <span className={`todo-category ${todo.category.toLowerCase()}`}>
                    {todo.category}
                  </span>
                  <span className="todo-date">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="todo-actions">
                <button
                  className={`todo-complete-btn ${todo.completed ? 'completed' : ''}`}
                  onClick={() => handleToggleComplete(todo)}
                >
                  {todo.completed ? 'Terminé' : 'Marquer comme terminé'}
                </button>

                <button
                  className="todo-delete-btn"
                  onClick={() => handleDelete(todo._id)}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
