const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,  // Champ obligatoire
    trim: true      // Enlève les espaces au début/fin
  },
  category: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false  // Valeur par défaut
  }
}, {
  timestamps: true  // Ajoute createdAt et updatedAt
});

module.exports = mongoose.model('Todo', todoSchema);
