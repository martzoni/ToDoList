import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState('Personnel');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAddTodo(newTodo, category);
      setNewTodo('');
      setCategory('Personnel')
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '1rem' }}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Nouvelle tâche"
        style={{ padding: '0.5rem' }}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      >
        <option value="Personnel">Personnel</option>
        <option value="Travail">Travail</option>
        <option value="Courses">Courses</option>
      </select>
      <button type="submit" style={{ marginLeft: '0.5rem', padding: '0.5rem' }}>
        Ajouter
      </button>
    </form>
  );
}

export default TodoForm;
