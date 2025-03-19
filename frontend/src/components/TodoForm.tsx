// frontend/src/components/TodoForm.tsx
import React, { useState } from 'react';
import { createTodo } from '../services/todoService';

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Autre');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Le titre est obligatoire.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createTodo({ title, description, category });

      // Réinitialiser le formulaire
      setTitle('');
      setDescription('');
      setCategory('Autre');

      // Rafraîchir la liste des tâches (vous pourriez utiliser un Context pour ça)
      window.dispatchEvent(new CustomEvent('todo-updated'));
    } catch (error: any) {
      const message = error.response?.data?.message || 'Une erreur est survenue lors de la création de la tâche.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo-form">
      <h2>Ajouter une nouvelle tâche</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (facultatif)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
          >
            <option value="Personnel">Personnel</option>
            <option value="Travail">Travail</option>
            <option value="Courses">Courses</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Ajout en cours...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
