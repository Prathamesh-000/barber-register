const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const Barber = require('./models/Barber');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/register-barber', async (req, res) => {
  const { name, email, phone, password, specialization, gender } = req.body;

  if (!name || !email || !phone || !password || !specialization || !gender) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const existingBarber = await Barber.findOne({ email });
  if (existingBarber) {
    return res.status(400).json({ error: 'Email already registered.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newBarber = new Barber({
      name,
      email,
      phone,
      password: hashedPassword,
      specialization,
      gender
    });

    await newBarber.save();
    res.status(201).json({ message: 'Barber registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error registering barber.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
