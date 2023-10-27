const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
  
      const user = await prisma.user.findUnique({
        where: {email},
      });
  
      if (!user) {
        return res.status(401).json({error: 'User not found'});
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({error: 'Invalid password'});
      }

      res.status(200).json({message: 'Login successful', user});
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({error: 'An error occurred while logging in'});
    }
  };
