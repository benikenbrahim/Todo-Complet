const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      sparse: true // plusieurs docs sans username sont autorisés
    },
    email: {
      type: String,
      required: true, // toujours présent (même fourni par Google)
      unique: true,
      sparse: true
    },
    password: {
      type: String,
      required: function () {
        return !this.provider; // obligatoire seulement si compte local
      }
    },
    provider: {
      type: String, // 'google', 'github', ...
      default: null
    },
    providerId: {
      type: String,
      default: null
    },
    roles: {
      type: [String],
      enum: ['user', 'admin'],
      default: ['user']
    }
  },
  { timestamps: true } // ajoute createdAt / updatedAt
);

module.exports = mongoose.model('User', userSchema);