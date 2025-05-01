const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'], // Allowed values
    required: true
  }
});

module.exports = mongoose.model('Barber', BarberSchema);
