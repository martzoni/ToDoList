// backend/routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// Toutes les routes sont maintenant protégées par le middleware auth
router.use(auth);

// Récupérer toutes les tâches de l'utilisateur connecté
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des tâches.' });
  }
});

// Créer une nouvelle tâche pour l'utilisateur connecté
router.post('/', async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const newTodo = new Todo({
      title,
      description,
      category,
      user: req.user.id  // Associer la tâche à l'utilisateur connecté
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Erreur lors de la création de la tâche:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la création de la tâche.' });
  }
});

// Mettre à jour une tâche (vérifier que l'utilisateur est le propriétaire)
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed, category } = req.body;

    // Vérifier que la tâche appartient à l'utilisateur connecté
    let todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: 'Tâche introuvable ou accès non autorisé.' });
    }

    // Mettre à jour la tâche
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, category },
      { new: true }
    );

    res.json(todo);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de la tâche.' });
  }
});

// Supprimer une tâche (vérifier que l'utilisateur est le propriétaire)
router.delete('/:id', async (req, res) => {
  try {
    // Vérifier que la tâche appartient à l'utilisateur connecté
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user.id });

    if (!todo) {
      return res.status(404).json({ message: 'Tâche introuvable ou accès non autorisé.' });
    }

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tâche supprimée avec succès.' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression de la tâche.' });
  }
});

module.exports = router;
