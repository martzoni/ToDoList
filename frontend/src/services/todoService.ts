// frontend/src/services/todoService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Type pour une tâche
export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  user: string;
  createdAt: string;
}

// Type pour la création d'une tâche
export interface CreateTodoInput {
  title: string;
  description?: string;
  category?: string;
}

// Type pour la mise à jour d'une tâche
export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
  category?: string;
}

// Fonction pour configurer le token d'authentification
export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Récupérer toutes les tâches de l'utilisateur
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    throw error;
  }
};

// Créer une nouvelle tâche
export const createTodo = async (todoData: CreateTodoInput): Promise<Todo> => {
  try {
    const response = await axios.post(`${API_URL}/todos`, todoData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error);
    throw error;
  }
};

// Mettre à jour une tâche
export const updateTodo = async (id: string, todoData: UpdateTodoInput): Promise<Todo> => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, todoData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    throw error;
  }
};

// Supprimer une tâche
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    throw error;
  }
};
