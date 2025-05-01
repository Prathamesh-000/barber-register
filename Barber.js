const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true ,unique:true},
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Barber', BarberSchema);
