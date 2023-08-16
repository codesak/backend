import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    const response = {
      users,
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const result = await User.findById(userId)
    const response = {
      result
    }
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/users', async (req, res) => {
  try {
   const {firstName, lastName, email, gender, phone} = req.body

   if (!firstName || !lastName || !email || !gender || !phone === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newUser = {
    firstName,
    lastName,
    email,
    gender,
    phone,
  };

   const result = await  User.create(newUser);

   res.status(201).json({ message: 'User created successfully'})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const result = await User.findByIdAndDelete(userId);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.put('/users/:id', async (req, res) => {
  try {
    const {userId} = req.body
    const updatedFields = {};

  // Check for updated fields in the request body and add them to the updatedFields object
  if (req.body.first_name) {
    updatedFields.first_name = req.body.first_name;
  }
  if (req.body.last_name) {
    updatedFields.last_name = req.body.last_name;
  }
  if (req.body.email) {
    updatedFields.email = req.body.email;
  }
  if (req.body.gender) {
    updatedFields.gender = req.body.gender;
  }
  if (req.body.avatar) {
    updatedFields.avatar = req.body.avatar;
  }
  if (req.body.domain) {
    updatedFields.domain = req.body.domain;
  }
  if (req.body.available !== undefined) {
    updatedFields.available = req.body.available;
  }
  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updatedFields },
    { new: true } // Set { new: true } to return the updated user in the response
  );
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User Update successfully', user });
  } catch (error) {
    console.error('Error Updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

export default router
