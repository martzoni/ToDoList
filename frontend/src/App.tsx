import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TodoForm from './components/TodoForm';
import CategorySelector from './components/CategorySelector';
import TodoList from './components/TodoList'; // Import the new component

// Définition du type Todo
export interface Todo {
  _id: string;
  text: string;
  category: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout');

  // Charger les todos au démarrage
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fonction pour charger les todos
  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error);
    }
  };

  // Fonction pour ajouter une todo
  const addTodo = async (text: string, category: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, category }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    }
  };

  // Fonction pour basculer l'état d'une todo
  const toggleTodo = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PUT',
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    }
  };

  // Fonction pour supprimer une todo
  const deleteTodo = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const filteredTodos = selectedCategory === 'Tout'
  ? todos
  : todos.filter(todo => todo.category === selectedCategory);

  return (
    <div>
      <Navbar />
      <TodoForm onAddTodo={addTodo} />
      <CategorySelector
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <TodoList todos={filteredTodos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo}/>
    </div>
  );
}

export default App;
