const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { first_name, last_name, birth_date } = req.body;
    const profile_picture = req.file.filename; 

    const userProfile = await prisma.userProfile.findFirst({
      where: { userId },
    });

    if (!userProfile) {
      await prisma.userProfile.create({
        data: {
          first_name,
          last_name,
          birth_date,
          profile_picture,
          userId,
        },
      });
    } else {
      await prisma.userProfile.update({
        where: { id: userProfile.id },
        data: {
          first_name,
          last_name,
          birth_date,
          profile_picture,
        },
      });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'An error occurred while updating the profile' });
  }
};
