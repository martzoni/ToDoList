import React from 'react';

// Importer l'interface Todo depuis App.tsx
import { Todo } from '../App'; // Ajustez le chemin selon votre structure de dossiers

// Définition des props du composant
interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}


const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <div style={{ margin: '1rem' }}>
      {todos.map(todo => (
        <div
          key={todo._id}
          style={{
            padding: '0.5rem',
            margin: '0.5rem 0',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span
            onClick={() => onToggleTodo(todo._id)}
            style={{
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none',
              flex: 1
            }}
          >
            {todo.text}
            <small style={{ marginLeft: '1rem', color: '#666' }}>
              ({todo.category})
            </small>
          </span>
          <button
              onClick={() => onDeleteTodo(todo._id)}
              style={{
                backgroundColor: '#ff4444',
                color: 'white',
                border: 'none',
                padding: '0.3rem 0.6rem',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Supprimer
            </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
