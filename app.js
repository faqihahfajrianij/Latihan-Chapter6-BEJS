require('dotenv').config();
const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

app.use(express.json());

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const userRoutes = require('./routes/user.routes');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/user', userRoutes);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log('listening on port', PORT));
